"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./audioPlayer.module.css";
import {
    Music,
    X,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume1,
    Volume2,
    VolumeX,
} from "lucide-react";

type Track = { title: string; src: string };

const tracks: Track[] = [
    { title: "I need an energy - Greg Holden", src: "/songs/song1.mp3" },
    { title: "Hoist the colours", src: "/songs/song2.mp3" },
    { title: "O'Kartier c'est la Hess", src: "/songs/song3.mp3" },
];

const setProgressFill = (el: HTMLInputElement, value: number, max: number) => {
    const pct = max ? (value / max) * 100 : 0;
    el.style.setProperty("--val", String(pct));
};

function fmtTime(sec: number) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}

export default function SimpleAudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const fabRef = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [volume, setVolume] = useState(0.2);
    const [prevVolume, setPrevVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;
        a.volume = muted ? 0 : volume;
        a.muted = muted;
    }, [volume, muted]);

    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;
        if (a.readyState >= 1 && Number.isFinite(a.duration)) {
            setDuration(a.duration);
        }
    }, []);

    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;

        const onTime = () => !seeking && setCurrentTime(a.currentTime || 0);
        const onLoaded = () => {
            if (Number.isFinite(a.duration)) setDuration(a.duration || 0);
        };
        const onEnded = () => next();
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        a.addEventListener("timeupdate", onTime);
        a.addEventListener("durationchange", onLoaded);
        a.addEventListener("loadedmetadata", onLoaded);
        a.addEventListener("ended", onEnded);
        a.addEventListener("play", onPlay);
        a.addEventListener("pause", onPause);

        return () => {
            a.removeEventListener("timeupdate", onTime);
            a.removeEventListener("durationchange", onLoaded);
            a.removeEventListener("loadedmetadata", onLoaded);
            a.removeEventListener("ended", onEnded);
            a.removeEventListener("play", onPlay);
            a.removeEventListener("pause", onPause);
        };
    }, [seeking]);

    useEffect(() => {
        const onDocDown = (e: MouseEvent) => {
            if (!open) return;
            const p = panelRef.current;
            const f = fabRef.current;
            const t = e.target as Node;
            if (p && p.contains(t)) return;
            if (f && f.contains(t)) return;
            setOpen(false);
        };
        const onEsc = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onDocDown);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocDown);
            document.removeEventListener("keydown", onEsc);
        };
    }, [open]);

    const once = (el: HTMLMediaElement, ev: keyof HTMLMediaElementEventMap) =>
        new Promise<void>((resolve) => {
            const h = () => {
                el.removeEventListener(ev, h as any);
                resolve();
            };
            el.addEventListener(ev, h as any, { once: true });
        });

    const playNow = async (a: HTMLAudioElement, src?: string) => {
        try {
            if (src) {
                a.pause();
                a.src = src;
                a.load();
            }
            if (!Number.isFinite(a.duration) || a.readyState < 3) {
                await Promise.race([once(a, "canplay"), new Promise((r) => setTimeout(r, 200))]);
            }
            await a.play();
            setIsPlaying(true);
        } catch {
            setIsPlaying(false);
        }
    };

    const loadTrack = async (idx: number, autoplay = true) => {
        const a = audioRef.current;
        if (!a) return;
        setCurrent(idx);
        setCurrentTime(0);

        a.pause();
        a.src = tracks[idx].src;
        a.load();

        if (!(a.readyState >= 1 && Number.isFinite(a.duration))) {
            await once(a, "loadedmetadata");
        }
        setDuration(a.duration || 0);

        if (autoplay) {
            await playNow(a);
        } else {
            setIsPlaying(false);
        }
    };

    const next = () => loadTrack((current + 1) % tracks.length, true);
    const prev = () => loadTrack((current - 1 + tracks.length) % tracks.length, true);

    const playPause = async () => {
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) {
            await playNow(a);
        } else {
            a.pause();
        }
    };

    const onSeekStart = () => setSeeking(true);
    const onSeekChange = (val: number) => setCurrentTime(val);
    const onSeekCommit = (val: number) => {
        const a = audioRef.current;
        if (!a) return;
        a.currentTime = val;
        setCurrentTime(val);
        setSeeking(false);
        if (isPlaying) a.play().catch(() => setIsPlaying(false));
    };

    const onVolumeChange = (val01: number) => {
        setVolume(val01);
        if (val01 === 0) {
            setMuted(true);
        } else {
            setMuted(false);
            setPrevVolume(val01);
        }
    };

    const toggleMute = () => {
        if (muted) {
            setMuted(false);
            setVolume(prevVolume || 0.6);
        } else {
            setPrevVolume(volume);
            setMuted(true);
        }
    };

    const VolumeIcon = () => {
        if (muted || volume === 0) return <VolumeX size={18} />;
        if (volume < 0.45) return <Volume1 size={18} />;
        return <Volume2 size={18} />;
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={tracks[current].src}
                preload="metadata"
                playsInline
                className={styles.hidden}
                onLoadedMetadata={(e) => {
                    const a = e.currentTarget;
                    if (Number.isFinite(a.duration)) setDuration(a.duration);
                }}
                onDurationChange={(e) => {
                    const a = e.currentTarget;
                    if (Number.isFinite(a.duration)) setDuration(a.duration);
                }}
            />
            <div className={styles.floatRoot}>
                <button
                    ref={fabRef}
                    className={`${styles.fab} ${open ? styles.fabOpen : ""}`}
                    onClick={() => setOpen((o) => !o)}
                    aria-label={open ? "Fermer le lecteur" : "Ouvrir le lecteur"}
                >
                    {open ? <X size={22} /> : <Music size={22} />}
                </button>

                <div
                    ref={panelRef}
                    className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
                    role="dialog"
                    aria-hidden={!open}
                >
                    <div className={styles.header}>
                        <div className={styles.trackTitle} title={tracks[current].title}>
                            {tracks[current].title}
                        </div>
                    </div>

                    <div className={styles.progressRow}>
                        <span className={styles.time}>{fmtTime(currentTime)}</span>
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            step={0.1}
                            value={Math.min(currentTime, duration || 0)}
                            className={`${styles.range} ${styles.rangeProgress}`}
                            ref={(el) => {
                                if (el) setProgressFill(el, currentTime, duration);
                            }}
                            onMouseDown={onSeekStart}
                            onTouchStart={onSeekStart}
                            onChange={(e) => {
                                const v = Number(e.target.value);
                                onSeekChange(v);
                                setProgressFill(e.target, v, duration);
                            }}
                            onMouseUp={(e) => onSeekCommit(Number((e.target as HTMLInputElement).value))}
                            onTouchEnd={(e) => onSeekCommit(Number((e.target as HTMLInputElement).value))}
                            aria-label="Position de lecture"
                        />
                        <span className={styles.fullTime}>{fmtTime(duration)}</span>
                    </div>

                    <div className={styles.controlsRow}>
                        <div className={styles.controls}>
                            <button className={styles.iconBtn} onClick={prev} aria-label="Piste précédente">
                                <SkipBack size={15} />
                            </button>
                            <button
                                className={`${styles.iconBtn} ${styles.playBtn}`}
                                onClick={playPause}
                                aria-label={isPlaying ? "Pause" : "Lecture"}
                            >
                                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                            </button>
                            <button className={styles.iconBtn} onClick={next} aria-label="Piste suivante">
                                <SkipForward size={15} />
                            </button>
                        </div>

                        <div className={styles.volumeRow}>
                            <button className={styles.smallIconBtn} onClick={toggleMute} aria-label="Muet">
                                <VolumeIcon />
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={muted ? 0 : volume}
                                className={`${styles.range} ${styles.rangeShort}`}
                                onChange={(e) => onVolumeChange(Number(e.target.value))}
                                aria-label="Volume"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
