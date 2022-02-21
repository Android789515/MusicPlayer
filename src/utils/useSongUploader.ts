import jsmediatags from 'jsmediatags'
import type { Tags } from 'jsmediatags/types'
import { v4 as uuid } from 'uuid'

import { songs } from '../stores/library'
import type { Song } from '../types/song'

export const useSongUploader = () => {
    const createUrl = (file: File) => URL.createObjectURL(file)

    const getDuration = (src: string) => new Promise(resolve => {
        const tempAudio = document.createElement('audio')
        tempAudio.src = src
        tempAudio.preload = 'metadata'

        tempAudio.onloadedmetadata = () => {
            resolve(tempAudio.duration)
        }
    })

    interface AudioFileData {
        tags: Tags,
        src: string,
        duration: number
    }

    const readTags = async (file: File) => {
        const reader = new jsmediatags.Reader(file).setTagsToRead([ 'title', 'artist', 'picture' ])
        const src = createUrl(file)
        const duration = await getDuration(src) as number

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