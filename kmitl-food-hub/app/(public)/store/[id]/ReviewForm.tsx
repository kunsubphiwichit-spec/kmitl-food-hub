'use client';

import React, { useState } from 'react';
import { Star, AlertTriangle, CheckCircle } from 'lucide-react';
// Assuming checkProfanity is implemented in this path
// import { checkProfanity } from '@/lib/profanity';

// Mock profanity check for standalone completion
const checkProfanity = (text: string) => {
  const badWords = ['badword1', 'badword2']; // Example words
  const found = badWords.filter(word => text.toLowerCase().includes(word));
  return { isProfane: found.length > 0, flaggedWords: found };
};

export default function ReviewForm({ storeId }: { storeId: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    // OWASP Pre-Validation Active profanity filter
    const profanityResult = checkProfanity(comment);
    if (profanityResult.isProfane) {
      setError(`Profanity detected. Please remove the following words: ${profanityResult.flaggedWords.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock API call
      // await fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ storeId, rating, comment }) });
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setComment('');
      setRating(0);
      setAgreed1(false);
      setAgreed2(false);
    } catch (err) {
      setError('An error occurred while submitting your review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 p-6 rounded-lg border border-green-200 flex flex-col items-center justify-center text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Review Submitted Successfully!</h3>
        <p className="text-green-600">Thank you for your feedback.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
          <AlertTriangle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star 
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoverRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <span className="text-xs text-gray-500">{comment.length}/400</span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 400))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Share your experience..."
            required
          />
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <AlertTriangle className="w-3 h-3 mr-1" /> This field is protected by OWASP Pre-Validation Active profanity filter.
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={agreed1}
              onChange={(e) => setAgreed1(e.target.checked)}
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              ฉันยืนยันว่ารีวิวนี้มาจากประสบการณ์จริงของฉัน
            </span>
          </label>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={agreed2}
              onChange={(e) => setAgreed2(e.target.checked)}
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              ฉันยอมรับเงื่อนไขและข้อตกลงการใช้งานแพลตฟอร์ม
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!agreed1 || !agreed2 || isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
