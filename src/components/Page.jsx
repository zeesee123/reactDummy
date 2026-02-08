import Container from './Container';
import {useEffect} from 'react';

function Page({ row, children,title }) {
    
    useEffect(()=>{
        document.title=title;
    },[])
    
    return (
        <Container row={row}>{children}</Container>
    );
}

export default Page;