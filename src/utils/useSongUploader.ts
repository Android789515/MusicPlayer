import jsmediatags from 'jsmediatags'
import type { Tags } from 'jsmediatags/types'
import { v4 as uuid } from 'uuid'

import { songs } from '../stores/library'
import type { Song } from '../types/song'

export const useSongUploader = () => {
    const createUrl = (file: File) => URL.createObjectURL(file)

    const getDuration = async (src: string) => {
        const tempAudio = document.createElement('audio')
        tempAudio.src = src
        tempAudio.volume = 0

        let duration = 0
        tempAudio.onloadedmetadata = () => {
            duration = tempAudio.duration
        }

        await tempAudio.play()
        tempAudio.pause()
        tempAudio.remove()
        return duration
    }

    interface AudioFileData {
        tags: Tags,
        src: string,
        duration: number
    }

    const readTags = async (file: File) => {
        const reader = new jsmediatags.Reader(file).setTagsToRead([ 'title', 'artist', 'picture' ])
        const src = createUrl(file)
        const duration = await getDuration(src)

        reader.read({
            onSuccess: data => {
                const song = createSong({ tags: data.tags, src, duration })
                songs.addSong(song)
            },
            onError: error => {
                throw new Error(`${error.type} ${error.info}`)
            }
        })
    }

    const createSong = ({ tags, src, duration }: AudioFileData) => {
        const { title, artist, picture } = tags
        const song: Song = {
            id: uuid(),
            src,
            coverArt: picture,
            title,
            artist,
            duration
        }
        return song
    }

    const handleUpload = (uploaderRef: HTMLInputElement) => {
        if (uploaderRef.files) {
            const uploadedData = [ ...uploaderRef.files ]

            uploadedData.forEach(readTags)
        }
    }

    return {
        handleUpload
    }
}