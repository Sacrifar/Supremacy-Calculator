import { useState } from 'react';
import './FAQSection.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the Supremacy Calculator used for?",
    answer: "The Supremacy Calculator is a free online tool designed to help players of the Supremacy game track and calculate guild points efficiently. It allows you to project your points based on daily rankings in Supreme Arena and Dream Realm, weekly rankings, and daily missions completion. Whether you're planning your strategy for the next event or tracking progress in real-time, this calculator helps you understand exactly how many points you'll earn and what you need to achieve your guild's supremacy goals."
  },
  {
    question: "How do I calculate my guild points for Supremacy events?",
    answer: "Calculating guild points is straightforward with our tool. First, enter your current total points at the top of the calculator. Then, set the number of active guild members participating in the event. Next, select your daily rankings for both Supreme Arena and Dream Realm modes - these award points every day. Choose your weekly rankings for modes that award points once per week. Finally, mark which daily missions you complete regularly. The calculator automatically computes your daily rate (points earned each day), weekly rate (points earned each week), and total projected points until the event ends. You can switch between Event, Daily, and Weekly projection modes to see different timeframes."
  },
  {
    question: "Does the Supremacy Calculator save my data?",
    answer: "Yes, the calculator automatically saves all your data in your browser's local storage. Every time you update your rankings, missions, or current points, the information is immediately saved. This means you can close your browser and come back later without losing any progress. Your settings, current points, and all selections are preserved between sessions. Additionally, you can export your data to a JSON file for backup purposes or to share with guild members, and import previously saved data if you switch devices or browsers."
  },
  {
    question: "Can I track both daily and weekly projections?",
    answer: "Absolutely! The calculator offers three flexible projection modes to help you plan both short-term and long-term strategies. Event mode shows your projected total points from now until the event end date, helping you see if you'll reach your overall goal. Daily mode projects what you'll earn in the next 24 hours based on your current daily rankings and missions. Weekly mode calculates your expected points for the next 7 days, including both daily rewards and weekly rankings. This flexibility helps you answer questions like 'Will I reach rank 1 by tomorrow?' or 'How many points will I have by the end of this week?' Switch between modes using the buttons at the top of the calculator."
  },
  {
    question: "What are Supreme Arena and Dream Realm rankings?",
    answer: "Supreme Arena and Dream Realm are game modes in Supremacy that award guild points based on your daily performance rankings. Each mode has different reward tiers - typically ranging from Rank 1 (highest points) to lower ranks with fewer points. These rankings reset daily, and points are awarded every day at a specific time. The calculator lets you select your typical ranking in each mode, and it multiplies these daily points by the number of days remaining in the event. Note that Supreme Arena is closed on Mondays and Tuesdays (UTC time), during which no points are awarded for that mode."
  },
  {
    question: "How do daily missions affect my total points?",
    answer: "Daily missions are repeatable tasks that award guild points when completed. The calculator includes a comprehensive list of available daily missions, each worth a specific number of points. You can check which missions you regularly complete - for example, 'Complete 10 battles' or 'Participate in guild activities'. The calculator then adds these mission points to your daily total. Since missions reset every day, completing the same missions consistently provides a reliable baseline of points that you can count on throughout the event duration."
  },
  {
    question: "What does the event timer countdown show?",
    answer: "The event timer shows exactly how many days, hours, minutes, and seconds remain until the current Supremacy event ends. You can set the event end date and time using the date picker. This countdown is crucial for accurate projections because the calculator uses it to determine how many more daily and weekly point cycles you'll complete. For example, if there are 5 days remaining, the calculator knows you'll receive 5 more sets of daily rankings and missions, helping provide precise final point totals."
  },
  {
    question: "Can I export or share my calculations?",
    answer: "Yes, you can easily export your calculation data. Click the 'Save Data' button to download a JSON file containing all your current settings - including your rankings, missions, current points, and event date. This file can be backed up for your records or shared with guild leaders to coordinate strategy. To load previously saved data, use the 'Load Data' button and select your JSON file. This is particularly useful when planning as a guild or when you want to compare different scenarios by saving multiple calculation sets."
  },
  {
    question: "How accurate are the point projections?",
    answer: "The calculator's projections are highly accurate based on the information you provide. It uses precise mathematical formulas to calculate daily and weekly point totals by multiplying your selected rankings and missions by the time remaining. However, actual results may vary if your performance changes - for example, if you achieve higher rankings, complete more missions, or if the event structure changes. The projections assume you maintain your current level of performance throughout the event. For best accuracy, update your current points and rankings regularly as the event progresses."
  },
  {
    question: "Why should I use this tool instead of calculating manually?",
    answer: "Manual calculation of guild points can be complex and error-prone, especially over multi-week events with daily and weekly cycles. This calculator automates all the math instantly and accounts for multiple factors simultaneously: different ranking tiers across multiple game modes, daily missions with varying point values, weekly rankings that award points once per week, and the exact time remaining in the event. It also handles special cases like Supreme Arena being closed on certain days. Instead of spending time with spreadsheets, you get instant, accurate projections that update in real-time as you adjust your strategy."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Everything you need to know about using the Supremacy Calculator to track guild points and optimize your event strategy
        </p>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-help-section">
          <h3>Still have questions?</h3>
          <p>
            The Supremacy Calculator is designed to be intuitive and user-friendly.
            All your data is automatically saved in your browser, so you can track
            your progress throughout the entire event without losing any information.
            Simply enter your current performance metrics and let the calculator
            show you exactly where you'll finish!
          </p>
        </div>
      </div>
    </section>
  );
};
