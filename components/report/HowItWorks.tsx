export const HowItWorks = () => {
    return (
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className="text-sky-400 text-xl font-bold">1</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">Submit Your Report</h3>
            <p className="mt-2 text-zinc-400">
              Fill out the anonymous report form with the details of the incident.
              No personal information is required, ensuring complete anonymity.
            </p>
          </div>
        </div>
  
        {/* Step 2 */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className="text-sky-400 text-xl font-bold">2</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">Secure Encryption</h3>
            <p className="mt-2 text-zinc-400">
              Your report is encrypted and stored securely in our database. Only
              authorized admins can access the data.
            </p>
          </div>
        </div>
  
        {/* Step 3 */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className="text-sky-400 text-xl font-bold">3</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">Admin Review</h3>
            <p className="mt-2 text-zinc-400">
              Admins review the report and take appropriate action while ensuring
              your identity remains protected.
            </p>
          </div>
        </div>
  
        {/* Step 4 */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className="text-sky-400 text-xl font-bold">4</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">Resolution</h3>
            <p className="mt-2 text-zinc-400">
              The issue is resolved, and the platform ensures transparency and
              accountability without compromising your anonymity.
            </p>
          </div>
        </div>
      </div>
    );
  };