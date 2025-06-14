
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StoryCard from './StoryCard';
import { Search, FilterX, ChevronRight } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { getLimitedStories, getSavedStories, SavedStory } from '@/utils/storyDatabase';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { STORY_SAVED_EVENT } from './StoryGenerator';

// Sample story data as fallback
const sampleStoriesData = [
  {
    id: "1",
    title: "The Curious Robot's Adventure",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", 
    category: "Adventure",
    ageRange: "5-8",
    content: "",
    createdAt: Date.now()
  },
  {
    id: "2",
    title: "Maya and the Magic Forest",
    coverImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    category: "Fantasy",
    ageRange: "6-9",
    content: "",
    createdAt: Date.now()
  },
  {
    id: "3",
    title: "Captain Leo's Space Journey",
    coverImage: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    category: "Space",
    ageRange: "7-10",
    content: "",
    createdAt: Date.now()
  },
  {
    id: "4",
    title: "The Talking Animals of Whisker Valley",
    coverImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    category: "Animals",
    ageRange: "4-7",
    content: "",
    createdAt: Date.now()
  },
  {
    id: "5",
    title: "Detective Sam Solves the Case",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Mystery",
    ageRange: "8-12",
    content: "",
    createdAt: Date.now()
  },
  {
    id: "6",
    title: "The Friendly Dragon",
    coverImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    category: "Fantasy",
    ageRange: "5-8",
    content: "",
    createdAt: Date.now()
  },
];

// Categories and age ranges for filters
const categories = ["All", "Adventure", "Fantasy", "Space", "Animals", "Mystery"];
const ageRanges = ["All Ages", "3-6", "5-8", "7-10", "8-12"];

const StoriesGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAgeRange, setSelectedAgeRange] = useState("All Ages");
  const [stories, setStories] = useState<SavedStory[]>([]);
  const [showAllStories, setShowAllStories] = useState(false);
  
  // Load stories on component mount and when stories are saved
  useEffect(() => {
    loadStories();
    
    // Add event listener for story saved event
    window.addEventListener(STORY_SAVED_EVENT, loadStories);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener(STORY_SAVED_EVENT, loadStories);
    };
  }, [showAllStories]);
  
  const loadStories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/stories/getStories`, {
        params: { limit: showAllStories ? undefined : 6 }
      });
      
      if (response.data && response.data.length > 0) {
        setStories(response.data);
      } else {
        setStories(sampleStoriesData);
      }
    } catch (error) {
      console.error("Error loading stories:", error);
      setStories(sampleStoriesData);
    }
  };
  
  
  // Filter stories based on search term, category, and age range
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory;
    const matchesAge = selectedAgeRange === "All Ages" || story.ageRange === selectedAgeRange;
    
    return matchesSearch && matchesCategory && matchesAge;
  });
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedAgeRange("All Ages");
  };
  
  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "All" || selectedAgeRange !== "All Ages";
  
  return (
    <div>
      {/* Search and filters */}
      <div className="mb-8 space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for stories..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="kid-input pl-12 w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="kid-input w-full"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
            <select
              value={selectedAgeRange}
              onChange={e => setSelectedAgeRange(e.target.value)}
              className="kid-input w-full"
            >
              {ageRanges.map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>
          
          {hasActiveFilters && (
            <div className="flex items-end">
              <motion.button
                className="flex items-center space-x-1 px-4 py-3 text-kid-red hover:bg-red-50 rounded-xl transition-colors"
                onClick={resetFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FilterX size={18} />
                <span>Clear</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
      
      {/* Stories grid */}
      {filteredStories.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
  <StoryCard
    key={story.id || story.id || index}  // Ensuring a unique key
    title={story.title}
    coverImage={story.coverImage}
    category={story.category}
    ageRange={story.ageRange}
    index={index}
    content={story.content}
  />
))}

          </div>
          
          {/* View All / Show Less button */}
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              className="border-kid-light-blue text-kid-blue hover:bg-kid-light-blue/20"
              onClick={() => setShowAllStories(!showAllStories)}
            >
              {showAllStories ? "Show Less" : "View All Stories"}
              {!showAllStories && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kid-light-blue mb-4">
              <Search className="text-kid-blue" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">No stories found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term</p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StoriesGrid;
