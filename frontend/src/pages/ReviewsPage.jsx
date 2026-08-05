function ReviewsPage() {
  const reviews = [
    {
      name: "Mia",
      rating: 5,
      comment: "Amazing atmosphere and perfect cocktails.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Noah",
      rating: 4,
      comment: "Great service, loved the happy hour menu.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Zoe",
      rating: 5,
      comment: "Best date night spot in town.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        <h1 className="text-3xl font-semibold text-white">Customer Reviews</h1>
        <p className="mt-4 max-w-3xl text-slate-300 leading-8">
          Read what guests are saying about our drinks, food, service, and
          events.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/20"
          >
            <div className="flex items-center gap-4">
              <div
                className="h-14 w-14 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${review.image})` }}
              />
              <div>
                <p className="font-semibold text-white">{review.name}</p>
                <p className="text-sm text-rose-300">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
              </div>
            </div>
            <p className="mt-5 text-slate-300 leading-7">{review.comment}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ReviewsPage;
