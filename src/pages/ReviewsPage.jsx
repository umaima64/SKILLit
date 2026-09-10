import { useMemo, useState } from "react";
import {
  STORAGE_KEYS,
  getData,
  initializeDemoData,
  saveData,
} from "../utils/storage";

function ReviewsPage() {
  const [form, setForm] = useState({
    author: "Demo User",
    project: "Bakery Website",
    rating: 5,
    comment: "Smooth collaboration and a clear final handoff.",
  });

  initializeDemoData();

  const reviews = useMemo(() => getData(STORAGE_KEYS.reviews, []), []);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updated = [
      {
        id: `review-${Date.now()}`,
        author: form.author,
        project: form.project,
        rating: form.rating,
        comment: form.comment,
        createdAt: new Date().toISOString(),
      },
      ...reviews,
    ];
    saveData(STORAGE_KEYS.reviews, updated);
    setForm({
      author: "Demo User",
      project: "Bakery Website",
      rating: 5,
      comment: "Smooth collaboration and a clear final handoff.",
    });
    window.location.reload();
  }

  return (
    <div className="container py-5 reviews-page">
      <div className="section-heading mb-4">
        <p className="eyebrow">Reviews</p>
        <h3>Feedback and testimonials</h3>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="panel-card">
            <p className="muted-label">Average Rating</p>
            <h3 className="stat-value">{averageRating} ⭐</h3>
            <p className="mb-0 text-muted mt-2">
              {reviews.length} total reviews
            </p>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="panel-card">
            <h3>Leave a review</h3>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Your name</label>
                  <input
                    className="form-control"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Project</label>
                  <input
                    className="form-control"
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Rating</label>
                  <select
                    className="form-select"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                  >
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Good</option>
                    <option value={3}>3 - Average</option>
                    <option value={2}>2 - Fair</option>
                    <option value={1}>1 - Poor</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Feedback</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="comment"
                    value={form.comment}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Submit review
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="review-list mt-4">
        {reviews.map((review) => (
          <div key={review.id} className="panel-card review-item">
            <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
              <div>
                <h4>{review.author}</h4>
                <p className="mb-0 text-muted">{review.project}</p>
              </div>
              <span className="match-badge">{review.rating}★</span>
            </div>
            <p className="mt-3 mb-0">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;
