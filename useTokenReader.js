import { 
  useState, 
  useEffect, 
  useMemo 
} from 'react';

const useTokenReader = () => {

    const [ isRedirect, setIsRedirect ] = useState(false);
    const [ token, setToken ] = useState('');
    let timer = null;

    const keyDown = ({key}) => {
        setIsRedirect(false);
        if(key !== 'Clear' && key !== 'Shift' && key !== 'Enter' && key !== 'Meta') {
            setToken(prevToken => prevToken+key);
        }
    }
    const keyUp = () => {
        clearTimeout(timer);
        timer = setTimeout( _ => {
            setIsRedirect(true);
        }, 500);
    }
    useEffect( _ => {
        window.addEventListener("keydown", keyDown, false);
        window.addEventListener("keyup", keyUp, false);
        return ( _ => {
            window.removeEventListener("keydown", keyDown, false);
            window.removeEventListener("keyup", keyUp, false);
        })
        //eslint-disable-next-line
    }, []);

    const result = useMemo( _ => {
        if(isRedirect){
            setToken('');
            return token;
        }
    }, [isRedirect]);

    return result;
}

export default useTokenReader;
