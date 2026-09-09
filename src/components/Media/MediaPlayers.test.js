import { render, screen } from '@testing-library/react';
import { VideoPlayer, AudioPlayer } from './MediaPlayers';

describe('VideoPlayer Component', () => {
  test('renders video player with title', () => {
    render(
      <VideoPlayer
        videoUrl="https://example.com/video.mp4"
        title="Exercise Tutorial"
      />
    );
    expect(screen.getByText('Exercise Tutorial')).toBeInTheDocument();
  });

  test('renders video description', () => {
    render(
      <VideoPlayer
        videoUrl="https://example.com/video.mp4"
        title="Push-ups"
        description="Learn proper form"
      />
    );
    expect(screen.getByText('Learn proper form')).toBeInTheDocument();
  });

  test('renders HTML5 video element for non-YouTube URLs', () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="https://example.com/video.mp4"
        title="Tutorial"
      />
    );
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
  });

  test('renders iframe for YouTube URLs', () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="https://www.youtube.com/embed/abcd1234"
        title="YouTube Video"
      />
    );
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });
});

describe('AudioPlayer Component', () => {
  test('renders audio player with title', () => {
    render(
      <AudioPlayer
        audioUrl="https://example.com/audio.mp3"
        title="Workout Mix"
      />
    );
    expect(screen.getByText('Workout Mix')).toBeInTheDocument();
  });

  test('renders artist information', () => {
    render(
      <AudioPlayer
        audioUrl="https://example.com/audio.mp3"
        title="Motivation Mix"
        artist="DJ Fit"
      />
    );
    expect(screen.getByText('by DJ Fit')).toBeInTheDocument();
  });

  test('renders description when provided', () => {
    render(
      <AudioPlayer
        audioUrl="https://example.com/audio.mp3"
        title="Mix"
        description="Energetic workout tracks"
      />
    );
    expect(screen.getByText('Energetic workout tracks')).toBeInTheDocument();
  });

  test('renders audio element with controls', () => {
    const { container } = render(
      <AudioPlayer
        audioUrl="https://example.com/audio.mp3"
        title="Mix"
      />
    );
    const audio = container.querySelector('audio');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('controls');
  });

  test('sets correct audio source', () => {
    const { container } = render(
      <AudioPlayer
        audioUrl="https://example.com/track.mp3"
        title="Track"
      />
    );
    const source = container.querySelector('source');
    expect(source).toHaveAttribute('src', 'https://example.com/track.mp3');
    expect(source).toHaveAttribute('type', 'audio/mpeg');
  });

  test('displays default artist when not provided', () => {
    render(
      <AudioPlayer
        audioUrl="https://example.com/audio.mp3"
        title="Mix"
      />
    );
    expect(screen.getByText(/by Unknown/)).toBeInTheDocument();
  });
});
