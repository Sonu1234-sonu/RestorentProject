import { useEffect, useState } from "react";
import axios from "axios";

const fallbackImages = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
];
const featuredEvents = [
  {
    _id: "featured-live-jazz",
    title: "Late Night Jazz Sessions",
    date: "Every Friday · 8:00 PM",
    category: "Live music",
    description:
      "Settle in for cocktails and a rotating trio playing soul, jazz and after-dark classics.",
    imageUrl: fallbackImages[0],
  },
  {
    _id: "featured-happy-hour",
    title: "Golden Hour",
    date: "Monday–Thursday · 5–7 PM",
    category: "Happy hour",
    description:
      "A little extra glow for the end of the day, with select drinks and small plates at special prices.",
    imageUrl: fallbackImages[1],
  },
  {
    _id: "featured-karaoke",
    title: "Karaoke After Dark",
    date: "Every Saturday · 9:30 PM",
    category: "Late night",
    description:
      "Pick your anthem, take the mic and let the room do the rest. Walk-ins are always welcome.",
    imageUrl: fallbackImages[2],
  },
];

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://restorentproject.onrender.com/api/events",
        );
        setEvents(response.data.events || []);
      } catch (error) {
        console.error("Could not load events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const displayedEvents = events.length ? events : featuredEvents;

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        <h1 className="text-3xl font-semibold text-white">Events</h1>
        <p className="mt-4 max-w-3xl text-slate-300 leading-8">
          Find upcoming live nights, karaoke, happy hour specials, and themed
          experiences at Dangi Restorent.
        </p>
      </section>

      {loading ? (
        <p className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-10 text-slate-400">
          Loading upcoming events…
        </p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedEvents.map((event, index) => (
            <article
              key={event._id}
              className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80 shadow-lg shadow-slate-950/20"
            >
              {event.videoUrl ? (
                <video
                  className="h-56 w-full bg-slate-900 object-cover"
                  controls
                  preload="metadata"
                  poster={
                    event.imageUrl ||
                    fallbackImages[index % fallbackImages.length]
                  }
                >
                  <source src={event.videoUrl} />
                  Your browser does not support event videos.
                </video>
              ) : (
                <img
                  className="h-56 w-full object-cover"
                  src={
                    event.imageUrl ||
                    fallbackImages[index % fallbackImages.length]
                  }
                  alt={`${event.title} event`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      fallbackImages[index % fallbackImages.length];
                  }}
                />
              )}
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-300">
                  {event.date}
                  {event.category ? ` · ${event.category}` : ""}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  {event.title}
                </h2>
                <p className="mt-3 text-slate-400 leading-7">
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default EventsPage;
