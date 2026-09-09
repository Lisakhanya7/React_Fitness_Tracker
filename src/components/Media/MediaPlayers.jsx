import PropTypes from 'prop-types';
import styles from './Media.module.css';

// VideoPlayer component with embedded video
const VideoPlayer = ({
  videoUrl,
  title,
  description,
  ...props
}) => {
  return (
    <div className={styles.videoPlayerContainer} {...props}>
      <div className={styles.videoWrapper}>
        <h3 className={styles.videoTitle}>{title}</h3>
        {description && <p className={styles.videoDescription}>{description}</p>}
        
        <div className={styles.videoFrame}>
          {videoUrl.includes('youtube') ? (
            <iframe
              width="100%"
              height="400"
              src={videoUrl.replace('youtube.com', 'youtube-nocookie.com')}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            ></iframe>
          ) : (
            <video controls width="100%" height="400" className={styles.videoElement}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

// AudioPlayer component with audio controls
const AudioPlayer = ({
  audioUrl,
  title,
  description,
  artist = 'Unknown',
  ...props
}) => {
  return (
    <div className={styles.audioPlayerContainer} {...props}>
      <div className={styles.audioWrapper}>
        <div className={styles.audioInfo}>
          <h4 className={styles.audioTitle}>{title}</h4>
          {artist && <p className={styles.audioArtist}>by {artist}</p>}
          {description && <p className={styles.audioDescription}>{description}</p>}
        </div>
        
        <audio controls className={styles.audioElement}>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  artist: PropTypes.string,
};

export { VideoPlayer, AudioPlayer };
