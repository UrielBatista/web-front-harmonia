import { BrowserRouter, Routes, Route  } from 'react-router-dom';

import Index from './components/Index';

export default function RoutesComponents(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index/>} />
        </Routes>
    </BrowserRouter>
    )
} 