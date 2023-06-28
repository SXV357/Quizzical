import {useState} from "react"

export default function useDarkMode(){
    const [dark, setDark] = useState(false);

    const toggleDarkMode = () => {
        setDark(prevDark => !prevDark)
    }

    return [dark, toggleDarkMode]
}