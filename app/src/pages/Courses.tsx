
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const courses = [
    {
      id: 1,
      title: "The Codes: Trading Foundation",
      description: "Learn the foundations of successful trading strategies, technical analysis, and market psychology.",
      price: 299,
      category: "beginner",
      features: ["24 video lessons", "Trading workbook", "Community access"],
    },
    {
      id: 2,
      title: "Technical Analysis Mastery",
      description: "Master the art of chart reading, pattern recognition, and technical indicators for better trading decisions.",
      price: 399,
      category: "intermediate",
      features: ["18 video lessons", "Practice exercises", "Weekly live Q&A"],
    },
    {
      id: 3,
      title: "Risk Management & Psychology",
      description: "Develop a robust risk management framework and understand the psychological aspects of trading.",
      price: 349,
      category: "intermediate",
      features: ["16 video lessons", "Risk calculator tool", "Case studies"],
    },
    {
      id: 4,
      title: "VVIP Advanced Trading Strategies",
      description: "Elite training covering advanced trading methods, institutional tactics, and mentorship (NFT required).",
      price: 999,
      category: "advanced",
      features: ["32 video lessons", "One-on-one mentoring", "Proprietary indicators"],
      requiresNft: true,
    },
    {
      id: 5,
      title: "Synthetic Assets Trading",
      description: "Learn how to trade synthetic assets in modern digital markets with specialized techniques.",
      price: 499,
      category: "advanced",
      features: ["22 video lessons", "Market simulation access", "Strategy templates"],
    },
  ];

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            OUR COURSES
          </h1>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Premium trading and creative courses designed to help you excel in today's
            competitive markets.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-red-500 hover:bg-red-600" : ""}
          >
            All Courses
          </Button>
          <Button 
            variant={selectedCategory === "beginner" ? "default" : "outline"}
            onClick={() => setSelectedCategory("beginner")}
            className={selectedCategory === "beginner" ? "bg-red-500 hover:bg-red-600" : ""}
          >
            Beginner
          </Button>
          <Button 
            variant={selectedCategory === "intermediate" ? "default" : "outline"}
            onClick={() => setSelectedCategory("intermediate")}
            className={selectedCategory === "intermediate" ? "bg-red-500 hover:bg-red-600" : ""}
          >
            Intermediate
          </Button>
          <Button 
            variant={selectedCategory === "advanced" ? "default" : "outline"}
            onClick={() => setSelectedCategory("advanced")}
            className={selectedCategory === "advanced" ? "bg-red-500 hover:bg-red-600" : ""}
          >
            Advanced
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105"
            >
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <div className="text-5xl text-gray-600 font-bold">
                  {course.id}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
                  {course.requiresNft && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      NFT Required
                    </span>
                  )}
                </div>
                
                <p className="text-gray-400 mb-6 h-24">
                  {course.description}
                </p>
                
                <div className="mb-6 space-y-2">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-white">${course.price}</span>
                  <span className="text-gray-400 text-sm">Lifetime access</span>
                </div>
                
                {course.requiresNft ? (
                  <Link to="/vvip">
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                      View VVIP Access
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    onClick={() => toast.success("Course enrollment coming soon!")}
                    className="w-full bg-red-500 hover:bg-red-600"
                  >
                    Enroll Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;