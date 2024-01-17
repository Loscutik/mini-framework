export function parseKeyInput(key, mutable) {
    switch (key) {
        case "Backspace":
            mutable = mutable.slice(0, -1); // removes last character
            break;
        default:
            const regex = new RegExp('^[a-zA-Z0-9_.-]*$')
            if (regex.test(mutable)) {
                mutable += key;
            }
            break;
    }
    return mutable
}