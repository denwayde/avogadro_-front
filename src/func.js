
export function getFirstNWords(text, maxWords = 22, addEllipsis = false) {
    if (!text || typeof text !== 'string') return '';
    
    const words = text.trim().split(/\s+/);
    const isTruncated = words.length > maxWords;
    
    const firstWords = words.slice(0, maxWords).join(' ');
    
    return addEllipsis && isTruncated ? `${firstWords}...` : firstWords;
  }


  
export function convertTime(timestamp){
    const date = new Date(timestamp * 1000)
    return date.toLocaleString('ru-RU')
  }

export function formatText(text) {
    // 1. Заменяем ссылки на <a>
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener">$1</a>'
    );
  
    // 2. Заменяем хэштеги на <a>
    text = text.replace(
      /(^|\s)(#([\wа-яА-ЯёЁ\d_]+))/g,
      '$1<a href="/tags/$3">#$3</a>'
    );

    text = text.replace(/\n/g, '<br>');
  
    return text;
  }