enum Keys {
    enter = 'Enter'
}

const useEnterKeyAsClick = (doOnClick: Function) => {
    return (event: KeyboardEvent) => {
        const keyPressed = event.key
        const wasEnterKeyPressed = keyPressed === Keys.enter

        if (wasEnterKeyPressed) {
            doOnClick()
        }
    }
}

export { useEnterKeyAsClick }