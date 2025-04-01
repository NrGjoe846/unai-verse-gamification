import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Globe } from '@/components/ui/globe';
import EventCalendar from '@/components/EventCalendar';
import EventCarousel from '@/components/EventCarousel';
import RegistrationForm from '@/components/RegistrationForm';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/components/ui/use-toast';
import { EventData } from '@/types/event';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEventSelect = (event: EventData) => {
    setSelectedEvent(event);
    toast({
      title: "Event Selected",
      description: `You've selected ${event.title}. Fill out the form below to register.`,
    });
  };

  const handleRegister = (eventId: string) => {
    // Replace with your Google Form URL
    const googleFormUrl = 'https://forms.google.com/your-form-url';
    window.open(googleFormUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-unai-black">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Globe */}
        <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-unai-black via-unai-darkblue to-unai-black z-0"></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" 
                 style={{
                   backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                   backgroundSize: '50px 50px'
                 }}>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-unai-blue/50 focus:border-transparent transition-all shadow-[0_0_15px_rgba(0,119,255,0.1)] focus:shadow-[0_0_20px_rgba(0,119,255,0.2)]"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            </div>
          </div>

          {/* Globe */}
          <div className="relative container mx-auto px-6 z-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">AI Summit 2025</h1>
              <p className="text-white/80 mb-6 text-lg">
                Join us for the largest AI conference of the year, featuring keynote speakers from leading tech companies,
                hands-on workshops, and networking opportunities with industry experts.
              </p>
              <button 
                onClick={() => handleRegister('ai-summit-2025')}
                className="btn-primary"
              >
                Register Now
              </button>
            </div>
            
            <div className="lg:w-1/2 relative h-[500px] w-full">
              <Globe className="absolute inset-0" />
            </div>
          </div>
        </div>

        {/* Event Carousel */}
        <div className="max-w-7xl mx-auto px-4 -mt-20 mb-16 relative z-20">
          <h3 className="text-2xl font-bold mb-6 text-white">Featured Events</h3>
          <EventCarousel onEventSelect={handleEventSelect} />
        </div>
        
        {/* Calendar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-2 gradient-text">Upcoming Events</h2>
          <p className="text-white/70 mb-10 max-w-2xl">
            Join UNAI TECH's cutting-edge events, from intense AI hackathons to in-depth workshops, all designed to supercharge your AI journey.
          </p>
          
          <Tabs defaultValue="calendar" className="mb-16">
            <TabsList className="mb-8 bg-white/5">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="carousel">Featured Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar">
              <EventCalendar onEventSelect={handleEventSelect} />
            </TabsContent>
            
            <TabsContent value="carousel">
              <EventCarousel onEventSelect={handleEventSelect} />
            </TabsContent>
          </Tabs>
          
          {selectedEvent && (
            <div className="glass-panel p-8 md:p-12 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white">Register for {selectedEvent.title}</h2>
              <RegistrationForm selectedEvent={selectedEvent} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
