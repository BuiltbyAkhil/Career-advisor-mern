const Groq = require('groq-sdk');
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL = 'llama-3.3-70b-versatile';

const generateQuiz = async (category) => {
    try {
        const prompt = `Generate a 5-question multiple choice quiz for someone interested in ${category}. Return ONLY valid JSON, no extra text: { "questions": [{ "question": "", "options": ["","","",""], "answer": "" }] }`;
        const response = await client.chat.completions.create({
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 600
        });
        const text = response.choices[0].message.content.trim();
        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (error) {
        console.error('Groq Quiz Error:', error);
        throw new Error('Failed to generate quiz');
    }
};

const generateRoadmap = async (targetCareer, educationLevel) => {
    try {
        const prompt = `Generate a career roadmap for becoming a ${targetCareer} for someone with ${educationLevel || 'high school'} education. Return ONLY valid JSON, no extra text: { "steps": [{ "title": "", "description": "", "duration": "", "resources": [{"title":"", "url":"", "type": "course"}] }] }`;
        const response = await client.chat.completions.create({
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1000
        });
        const text = response.choices[0].message.content.trim();
        const cleaned = text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (!parsed || !Array.isArray(parsed.steps)) {
            throw new Error('AI output missing "steps" array');
        }

        const allowedResourceTypes = new Set(['course', 'article', 'video', 'book']);

        // Normalize AI output into the shape our frontend + Mongoose schema expects.
        parsed.steps = parsed.steps.map((s) => {
            const step = s && typeof s === 'object' ? s : {};

            const resources = Array.isArray(step.resources) ? step.resources : [];
            const normalizedResources = resources.map((r) => {
                const resObj = r && typeof r === 'object' ? r : {};
                const rawType = (resObj.type || resObj.kind || 'course') + '';
                const type = allowedResourceTypes.has(rawType) ? rawType : 'course';

                return {
                    title: (resObj.title || resObj.name || '').toString(),
                    url: (resObj.url || resObj.link || '').toString(),
                    type
                };
            });

            // status defaults at schema level, but we normalize if AI includes it.
            const rawStatus = (step.status || 'pending') + '';
            const status = ['pending', 'in-progress', 'completed'].includes(rawStatus) ? rawStatus : 'pending';

            return {
                title: (step.title || '').toString(),
                description: (step.description || '').toString(),
                duration: (step.duration || '').toString(),
                status,
                resources: normalizedResources
            };
        });

        if (parsed.steps.length === 0) {
            throw new Error('AI output returned an empty "steps" array');
        }

        return parsed;
    } catch (error) {
        console.error('Groq Roadmap Error:', error);
        throw new Error('Failed to generate roadmap');
    }
};

const chatWithAI = async (messages) => {
    try {
        const response = await client.chat.completions.create({
            model: MODEL,
            messages: [
                { role: 'system', content: 'You are a helpful and knowledgeable career advisor. Provide concise, actionable advice.' },
                ...messages.filter(m => m.role !== 'system')
            ],
            max_tokens: 400
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Groq Error:', error);
        throw new Error('Failed to get response from AI');
    }
};

module.exports = { generateQuiz, generateRoadmap, chatWithAI };
