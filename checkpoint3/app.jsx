import React, { useState, useEffect } from "react";
import "./App.css";

/* --- DADOS MOCKADOS --- */
const initialSongs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:54", cover: "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png" },
  { id: 2, title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: "6:30", cover: "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg" },
  { id: 3, title: "Starboy", artist: "The Weeknd", album: "Starboy", duration: "3:50", cover: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" },
  { id: 4, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png" },
  { id: 5, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", duration: "5:01", cover: "https://upload.wikimedia.org/wikipedia/en/3/3c/Smells_Like_Teen_Spirit.jpg" },
];

/* --- COMPONENTE: PLAYLISTS (Requisito: Componente separado) --- */
const Playlists = ({ playlists }) => {
  return (
    <div className="playlists-list">
      <p className="playlist-label">SUAS PLAYLISTS</p>
      {playlists.map((pl, index) => (
        <div key={index} className="playlist-item">🎵 {pl}</div>
      ))}
    </div>
  );
};

/* --- COMPONENTE: SIDEBAR --- */
const Sidebar = ({ playlists, onCreatePlaylist }) => {
  return (
    <aside className="sidebar">
      <div className="logo">Spotify Clone</div>
      <nav>
        <button className="nav-item active">🏠 Início</button>
        <button className="nav-item">🔍 Buscar</button>
        <button className="nav-item">📚 Biblioteca</button>
      </nav>
      <div className="nav-section">
        <button className="nav-item action-btn" onClick={onCreatePlaylist}>➕ Criar playlist</button>
        <button className="nav-item action-btn">❤️ Músicas Curtidas</button>
      </div>
      
      {/* Integrando o componente de Playlists aqui */}
      <Playlists playlists={playlists} />
    </aside>
  );
};

/* --- COMPONENTE: HEADER (Requisito: Componente separado) --- */
const Header = ({ currentSong }) => {
  return (
    <header className="playlist-header">
      <img src={currentSong.cover} alt="Capa" className="header-cover" />
      <div className="playlist-info">
        <p>PLAYLIST PÚBLICA</p>
        {/* Título dinâmico baseado na música para dar efeito visual */}
        <h1>Mix de {currentSong.artist}</h1>
        <p>As melhores faixas selecionadas para você ouvir agora.</p>
      </div>
    </header>
  );
};

/* --- COMPONENTE: LISTA DE MÚSICAS --- */
const ListaMusicas = ({ songs, currentSong, onPlay, favorites, onToggleFavorite, searchTerm, onSearchChange }) => {
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="song-list-container">
      {/* Barra de Busca (Funcionalidade Principal) */}
      <div className="search-bar-container">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Busque artistas ou músicas..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="list-header">
        <span>#</span>
        <span>Título</span>
        <span>Álbum</span>
        <span>Duração</span>
        <span>Fav</span>
      </div>

      {filteredSongs.map((song, index) => (
        <div 
          key={song.id} 
          className={`song-row ${currentSong.id === song.id ? 'active-song' : ''}`}
          onClick={() => onPlay(song)}
        >
          <span>{index + 1}</span>
          <div className="song-title-col">
            <img src={song.cover} alt="" />
            <div>
              <p className="song-name">{song.title}</p>
              <p className="song-artist">{song.artist}</p>
            </div>
          </div>
          <span>{song.album}</span>
          <span>{song.duration}</span>
          <span 
            className="heart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(song.id);
            }}
          >
            {favorites.includes(song.id) ? "❤️" : "🤍"}
          </span>
        </div>
      ))}
    </div>
  );
};

/* --- COMPONENTE: PLAYER --- */
const Player = ({ currentSong, isPlaying, onTogglePlay, progress, onNext, onPrev, volume, onVolumeChange }) => {
  // Formata segundos para MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <footer className="player-footer">
      <div className="footer-left">
        <img src={currentSong.cover} alt="" />
        <div>
          <p className="song-name">{currentSong.title}</p>
          <p className="song-artist">{currentSong.artist}</p>
        </div>
      </div>

      <div className="footer-center">
        <div className="controls">
          <button className="control-btn" onClick={onPrev}>⏮️</button>
          <button onClick={onTogglePlay} className="play-button">
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button className="control-btn" onClick={onNext}>⏭️</button>
        </div>
        <div className="progress-bar-container">
          <span>{formatTime(progress)}</span>
          <div className="progress-bar">
            {/* Animação via width */}
            <div className="progress-fill" style={{ width: `${(progress / 200) * 100}%` }}></div>
          </div>
          <span>{currentSong.duration}</span> {/* Duração estática mockada */}
        </div>
      </div>

      <div className="footer-right">
        <span>🔊</span>
        <input 
          type="range" 
          min="0" max="100" 
          value={volume} 
          onChange={(e) => onVolumeChange(e.target.value)} 
          className="volume-slider"
        />
      </div>
    </footer>
  );
};

/* --- COMPONENTE PRINCIPAL: SPOTIFY CLONE (App) --- */
export default function SpotifyClone() {
  // Gerenciamento de Estado (State Management)
  const [currentSong, setCurrentSong] = useState(initialSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [volume, setVolume] = useState(50);
  const [playlists, setPlaylists] = useState(["Rock Clássico", "Viagem", "Foco"]);
  const [favorites, setFavorites] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");

  // Efeito para Barra de Progresso Animada
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 200 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Funções de Controle (Event Handling)
  const handleCreatePlaylist = () => {
    const name = prompt("Digite o nome da nova playlist:");
    if (name) setPlaylists([...playlists, name]);
  };

  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handlePlaySong = (song) => {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleNext = () => {
    const currentIndex = initialSongs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % initialSongs.length;
    setCurrentSong(initialSongs[nextIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const currentIndex = initialSongs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + initialSongs.length) % initialSongs.length;
    setCurrentSong(initialSongs[prevIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="app-container">
      <Sidebar 
        playlists={playlists} 
        onCreatePlaylist={handleCreatePlaylist}
      />

      <main className="main-content">
        {/* Componente Header Separado */}
        <Header currentSong={currentSong} />

        {/* Componente ListaMusicas Separado */}
        <ListaMusicas 
          songs={initialSongs}
          currentSong={currentSong}
          onPlay={handlePlaySong}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </main>

      {/* Componente Player Separado */}
      <Player 
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        progress={progress}
        onNext={handleNext}
        onPrev={handlePrev}
        volume={volume}
        onVolumeChange={setVolume}
      />
    </div>
  );
}