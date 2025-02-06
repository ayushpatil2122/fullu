"use client"
import type React from "react"
import { useState } from "react"
import { Star } from "lucide-react"

interface ServiceAnswers {
  [key: string]: "yes" | "no"
}

const FeedbackForm = () => {
  const [userInfo, setUserInfo] = useState({ name: "" })
  const [ratings, setRatings] = useState<{ [key: string]: number }>({})
  const [serviceAnswers, setServiceAnswers] = useState<ServiceAnswers>({})
  const [hover, setHover] = useState<{ [key: string]: number }>({})
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const categories = {
    food: {
      title: "खाद्य गुणवत्ता / Food Quality",
      questions: [
        { id: "taste", label: "स्वाद / Taste of food" },
        { id: "quantity", label: "जेवणाचे प्रमाण / Quantity of food" },
      ],
    },
    service: {
      title: "सेवा / Service",
      questions: [
        {
          id: "service_experience",
          label:
            "क्यूआर कोड स्कॅन करून जेवण मागवण्याचा अनुभव समाधानकारक होता का? / Were you satisfied with our QR code food ordering service?",
        },
        {
          id: "response_accuracy",
          label: "तुम्ही मागवलेले जेवण आणि मिळालेले जेवण यात फरक होता का? / Was the delivered food exactly what you ordered?",
        },
      ],
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare the data to be sent
    const feedbackData = {
      name: userInfo.name,
      testRating: ratings[`food_taste`] || 0,
      quntityRating: ratings[`food_quantity`] || 0,
      easyToUseRating: serviceAnswers.service_experience === "yes" ? 5 : 1,
      accuracyRating: serviceAnswers.response_accuracy === "yes" ? 5 : 1,
      comment: comment,
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      })

      if (response.ok) {
        console.log("Feedback submitted successfully")
        setSubmitted(true)
      } else {
        console.error("Failed to submit feedback")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setUserInfo({ name: "" })
    setRatings({})
    setServiceAnswers({})
    setComment("")
  }

  const StarRating = ({ category, questionId }: { category: string; questionId: string }) => {
    const ratingKey = `${category}_${questionId}`
    const currentRating = ratings[ratingKey]
    const currentHover = hover[ratingKey]

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform hover:scale-110"
            onMouseEnter={() => setHover({ ...hover, [ratingKey]: star })}
            onMouseLeave={() => setHover({ ...hover, [ratingKey]: 0 })}
            onClick={() => {
              setRatings((prevRatings) => ({
                ...prevRatings,
                [ratingKey]: star,
              }))
              console.log("Selected Rating:", { [ratingKey]: star }) // Debugging
            }}
          >
            <Star
              size={24}
              className={`transition-colors duration-200 ${
                star <= (currentHover || currentRating) ? "fill-orange-500 text-orange-500" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const YesNoButtons = ({ questionId }: { questionId: any }) => (
    <div className="flex gap-3 min-w-[200px] justify-start">
      <button
        type="button"
        onClick={() => setServiceAnswers({ ...serviceAnswers, [questionId]: "yes" })}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 w-24 ${
          serviceAnswers[questionId] === "yes"
            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
            : "bg-white border-2 border-orange-200 text-orange-500 hover:bg-orange-50"
        }`}
      >
        होय / Yes
      </button>
      <button
        type="button"
        onClick={() => setServiceAnswers({ ...serviceAnswers, [questionId]: "no" })}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 w-24 ${
          serviceAnswers[questionId] === "no"
            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
            : "bg-white border-2 border-orange-200 text-orange-500 hover:bg-orange-50"
        }`}
      >
        नाही / No
      </button>
    </div>
  )

  const renderQuestions = (categoryKey: any, category: any) => {
    if (categoryKey === "service") {
      return category.questions.map((question: any) => (
        <div
          key={question.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-orange-50/80 p-4 rounded-xl transition-colors"
        >
          <label className="text-gray-700 font-medium">{question.label}</label>
          <YesNoButtons questionId={question.id} />
        </div>
      ))
    }
    return category.questions.map((question: any) => (
      <div
        key={question.id}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-orange-50/80 p-4 rounded-xl transition-colors"
      >
        <label className="text-gray-700 font-medium">{question.label}</label>
        <StarRating category={categoryKey} questionId={question.id} />
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100/50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white/80 rounded-2xl p-6 shadow-xl">
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                placeholder="आपले नाव / Your Name"
                className="w-full px-4 py-3 rounded-xl border-2"
                required
              />
            </div>

            {Object.entries(categories).map(([categoryKey, category]) => (
              <div key={categoryKey} className="bg-white/80 p-6 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold">{category.title}</h2>
                <div className="space-y-4">{renderQuestions(categoryKey, category)}</div>
              </div>
            ))}

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="अतिरिक्त टिप्पणी / Additional Comments"
              className="w-full h-32 p-4 rounded-xl border-2"
            ></textarea>

            <button onClick={handleSubmit}  type="submit" className="w-full bg-orange-500 text-white py-3 rounded-xl">
              Submit Feedback
            </button>
          </form>
        ) : (
          <div className="text-center p-6 rounded-2xl bg-white/80">
            <h2 className="text-2xl font-bold">धन्यवाद!</h2>
            <p>आपल्या अभिप्राय साठी धन्यवाद</p>
            <button onClick={resetForm} className="mt-4 bg-orange-500 text-white px-8 py-3 rounded-xl">
              Submit Another Response
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackForm

