import { useState } from "react";
import CategoryFilter from "../components/BookCategoryFilter";
import WelcomePage from "../components/WelcomePage";
import BookList from "../components/BookList";
import CartSummary from "../components/CartSummary";

function ProjectsPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    return (
        <div className='container mt-4'>
          <CartSummary />
          <WelcomePage />
        <div className='row'>
          <div className='col-md-3'>
            <CategoryFilter 
            selectedCategories={selectedCategories} 
            setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className='col-md-9'>
            <BookList selectedCategories={selectedCategories}/>
          </div>
        </div>
      </div>
    );
}

export default ProjectsPage;