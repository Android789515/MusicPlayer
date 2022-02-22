import jsmediatags from 'jsmediatags'
import type { TagType } from 'jsmediatags/types'
import { v4 as uuid } from 'uuid'

import { library } from '../stores/library'
import type { Song } from '../types/song'
import type { AudioFileData, TagDefaults } from '../types/audioFileTypes'

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

    const tagsToFind = [ 'title', 'artist', 'picture' ]

    const readTags = async (file: File) => {
        const tagDefaults: TagDefaults = {
            title: file.name,
            artist: 'Unknown artist'
        }
        const reader = new jsmediatags.Reader(file).setTagsToRead(tagsToFind)
        const src = createUrl(file)
        const duration = await getDuration(src) as number

        reader.read({
            onSuccess: data => {
                const song = createSong({
                    tags: validateTags(data, tagDefaults),
                    src, duration
                })
                library.addSong(song)
            },
            onError: error => {
                throw new Error(`${error.type} ${error.info}`)
            }
        })
    }

    const validateTags = (data: TagType, tagDefaults: TagDefaults) => {
        const validTags = tagsToFind.reduce((validatedTags, tag) => {
            const nextTag = data.tags[tag]
            const wasTagFound = nextTag !== undefined

            if (wasTagFound) {
                return { ...validatedTags, [tag]: nextTag }
            }
            return { ...validatedTags, [tag]: tagDefaults[tag] }
        }, {})

        return validTags
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