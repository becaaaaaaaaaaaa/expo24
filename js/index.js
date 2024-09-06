const adviceUrl = 'https://api.adviceslip.com/advice';

async function getAdvice() {
    try {
        const response = await fetch(adviceUrl);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return data.slip.advice; // Retorna o conselho em inglês
    } catch (error) {
        console.error('Erro ao buscar conselho:', error);
        return 'Erro ao carregar conselho.';
    }
}

async function translateText(text, targetLang = 'pt') {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.responseData.translatedText; // Retorna o texto traduzido
    } catch (error) {
        console.error('Erro ao traduzir texto:', error);
        return text; // Se houver erro, exibe o texto original
    }
}

async function plotAdvice() {
    const advice = await getAdvice();
    const translatedAdvice = await translateText(advice);
    document.getElementById('advice').textContent = translatedAdvice;
}

// Evento para gerar novo conselho ao clicar no botão
document.getElementById('new-advice').addEventListener('click', plotAdvice);

// Gera um conselho ao carregar a página
window.onload = plotAdvice;
