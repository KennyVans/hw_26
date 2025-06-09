import React, { Component } from 'react';
import './App.css';

const initialEmojis = [
  { icon: '💖', count: 0 },
  { icon: '🎉', count: 0 },
  { icon: '👑', count: 0 },
  { icon: '🤓', count: 0 },
  { icon: '💩', count: 0 }
];

class App extends Component {
  constructor(props) {
    super(props);
    const saved = localStorage.getItem('emojiVotes');
    this.state = {
      emojis: saved ? JSON.parse(saved) : initialEmojis,
      winner: null
    };
  }

  componentDidUpdate(_, prevState) {
    if (prevState.emojis !== this.state.emojis) {
      localStorage.setItem('emojiVotes', JSON.stringify(this.state.emojis));
    }
  }

  handleVote = (index) => {
    const newEmojis = [...this.state.emojis];
    newEmojis[index].count += 1;
    this.setState({ emojis: newEmojis });
  };

  showResults = () => {
    const max = Math.max(...this.state.emojis.map(e => e.count));
    const winner = this.state.emojis.find(e => e.count === max && max > 0);
    this.setState({ winner: winner || null });
  };

  clearResults = () => {
    const cleared = this.state.emojis.map(e => ({ ...e, count: 0 }));
    this.setState({ emojis: cleared, winner: null });
    localStorage.removeItem('emojiVotes');
  };

  render() {
    const { emojis, winner } = this.state;

    return (
      <main>
        <h1>Голосування за найкращий смайлик</h1>
        <div className="emoji-container">
          {emojis.map((emoji, index) => (
            <div key={index} className="emoji-block">
              <div className="emoji" onClick={() => this.handleVote(index)}>
                {emoji.icon}
              </div>
              <div className="emoji-count">{emoji.count}</div>
            </div>
          ))}
        </div>

        <div>
          <button onClick={this.showResults}>Показати результат</button>
          <button onClick={this.clearResults}>Очистити результати</button>
        </div>

        <div className="results">
          <h2>Результати голосування:</h2>
          <p><strong>Переможець:</strong> <span>{winner?.icon || ''}</span></p>
          <p>Кількість голосів: <span>{winner?.count || ''}</span></p>
        </div>
      </main>
    );
  }
}

export default App;