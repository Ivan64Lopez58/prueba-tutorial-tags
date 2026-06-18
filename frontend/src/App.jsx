import { BrowserRouter, Routes, Route } from "react-router-dom";

import TutorialsPage from "./pages/TutorialsPage";
import CreateTutorialPage from "./pages/CreateTutorialPage";
import TagsPage from "./pages/TagsPage";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TutorialsPage/>}/>
                <Route path="/create-tutorial" element={<CreateTutorialPage />} />
                <Route path="/tags" element={<TagsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;