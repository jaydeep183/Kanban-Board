import { useState, useEffect } from "react";
import FilterButton from './components/FilterButton';
import Board from './components/Board';

function App() {
  const [taskData, setTaskData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [viewGrouping, setViewGrouping] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [viewSorting, setViewSorting] = useState(
    localStorage.getItem("sorting") || "priority"
  );

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const responseData = await response.json();
        setTaskData(responseData.tickets);
        setUserData(responseData.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResourceData();
  }, []);

  const handleGroupingSelection = (newGrouping) => {
    setViewGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping);
  };

  const handleSortingSelection = (newSorting) => {
    setViewSorting(newSorting);
    localStorage.setItem("sorting", newSorting);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <FilterButton
            grouping={viewGrouping}
            sorting={viewSorting}
            onGroupingChange={handleGroupingSelection}
            onSortingChange={handleSortingSelection}
          />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Board
          tickets={taskData}
          users={userData}
          grouping={viewGrouping}
          sorting={viewSorting}
        />
      </main>
    </div>
  );
}

export default App;
