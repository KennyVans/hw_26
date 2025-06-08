import React, { useState, useEffect } from 'react';
import './App.css';

const initialEmojis = [
  { icon: '💖', count: 0 },
  { icon: '🎉', count: 0 },
  { icon: '👑', count: 0 },
  { icon: '🤓', count: 0 },
  { icon: '💩', count: 0 }
];

function App() {
  const [emojis, setEmojis] = useState(() => {
    const saved = localStorage.getItem('emojiVotes');
    return saved ? JSON.parse(saved) : initialEmojis;
  });

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    localStorage.setItem('emojiVotes', JSON.stringify(emojis));
  }, [emojis]);

  const handleVote = (index) => {
    const newEmojis = [...emojis];
    newEmojis[index].count += 1;
    setEmojis(newEmojis);
  };

  const showResults = () => {
    const max = Math.max(...emojis.map(e => e.count));
    const win = emojis.find(e => e.count === max && max > 0);
    setWinner(win || null);
  };

  const clearResults = () => {
    const cleared = emojis.map(e => ({ ...e, count: 0 }));
    setEmojis(cleared);
    localStorage.removeItem('emojiVotes');
    setWinner(null);
  };

  return (
    <main>
      <h1>Голосування за найкращий смайлик</h1>
      <div className="emoji-container">
        {emojis.map((emoji, index) => (
          <div key={index} className="emoji-block">
            <div className="emoji" onClick={() => handleVote(index)}>
              {emoji.icon}
            </div>
            <div className="emoji-count">{emoji.count}</div>
          </div>
        ))}
      </div>

      <div>
        <button onClick={showResults}>Показати результат</button>
        <button onClick={clearResults}>Очистити результати</button>
      </div>

      <div className="results">
        <h2>Результати голосування:</h2>
        <p><strong>Переможець:</strong> <span>{winner?.icon || ''}</span></p>
        <p>Кількість голосів: <span>{winner?.count || ''}</span></p>
      </div>
    </main>
  );
}

export default App;
