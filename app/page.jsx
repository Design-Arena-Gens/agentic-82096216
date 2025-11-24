"use client";

import { useMemo, useState } from "react";
import TabNav from "../components/TabNav";
import {
  deriveAudienceSegments,
  generateCalendar,
  generateDreams,
  generateIdeas,
  generateOffer,
  generatePainPoints,
  generatePillars,
  stringifySection,
} from "../lib/generators";

function CopyButton({ text }) {
  return (
    <button
      className="copy"
      onClick={() => navigator.clipboard.writeText(text)}
      type="button"
      title="Copy to clipboard"
    >
      Copy
    </button>
  );
}

export default function Page() {
  const [active, setActive] = useState("audience");

  const [niche, setNiche] = useState("marketing");
  const [audience, setAudience] = useState("coaches and consultants (B2B)");
  const [product, setProduct] = useState("accelerator");
  const [transformation, setTransformation] = useState("book 20-40 qualified calls / month");
  const [priceRange, setPriceRange] = useState("8-12 weeks");
  const [goals, setGoals] = useState("grow pipeline, increase booked calls, webinar push");
  const [startDate, setStartDate] = useState("");

  const segments = useMemo(() => deriveAudienceSegments(audience, niche), [audience, niche]);
  const pains = useMemo(() => generatePainPoints({ audience, niche, product }), [audience, niche, product]);
  const dreams = useMemo(() => generateDreams({ audience, niche }), [audience, niche]);
  const pillars = useMemo(() => generatePillars({ niche, goals }), [niche, goals]);
  const ideas = useMemo(() => generateIdeas(pillars, niche), [pillars, niche]);
  const calendar = useMemo(() => generateCalendar({ startDate, pillars }), [startDate, pillars]);
  const offer = useMemo(
    () => generateOffer({ niche, product, transformation, priceRange }),
    [niche, product, transformation, priceRange]
  );

  const tabs = [
    { key: "audience", label: "Audience" },
    { key: "insights", label: "Pain + Dreams" },
    { key: "content", label: "Content Plan" },
    { key: "offer", label: "Offer Builder" },
  ];

  const exportAll = () => {
    const doc = [
      `# Marketing Coach Agent ? Plan`,
      "",
      `Niche: ${niche}`,
      `Audience: ${audience}`,
      `Product: ${product}`,
      `Transformation: ${transformation}`,
      "",
      stringifySection("Audience Segments", segments),
      "",
      stringifySection("Pain Points", pains),
      "",
      stringifySection("Dreams and Desires", dreams),
      "",
      stringifySection("Offer", offer),
      "",
      stringifySection("Pillars", pillars),
      "",
      stringifySection("Ideas", ideas),
      "",
      stringifySection("Calendar (4 weeks)", calendar),
      "",
    ].join("\n");
    navigator.clipboard.writeText(doc);
    alert("Plan copied to clipboard.");
  };

  return (
    <div className="panel">
      <TabNav tabs={tabs} active={active} onChange={setActive} />

      <div className="grid">
        <div className="panel">
          <h3 className="section-title">
            <span>Inputs</span>
          </h3>
          <div className="row">
            <div>
              <label>Niche</label>
              <input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g., fitness coaching, B2B SaaS, ecom" />
            </div>
            <div>
              <label>Audience</label>
              <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g., B2B founders, coaches, DTC brands" />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Product</label>
              <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g., program, accelerator, course, agency" />
            </div>
            <div>
              <label>Transformation</label>
              <input value={transformation} onChange={(e) => setTransformation(e.target.value)} placeholder="Clear, specific outcome" />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Timeframe / Price Context</label>
              <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="e.g., 8-12 weeks, $3k-$6k" />
            </div>
            <div>
              <label>Growth Goals</label>
              <input value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="e.g., webinar, booked calls, waitlist" />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Plan Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <p className="small">Leave blank to start from today</p>
            </div>
          </div>
          <div className="btn-row">
            <button className="btn" type="button" onClick={exportAll} title="Copy all sections as a single doc">
              Export full plan
            </button>
          </div>
        </div>

        <div className="panel">
          {active === "audience" && (
            <section>
              <div className="section-title">
                <h3>Audience Segments</h3>
                <CopyButton text={stringifySection("Audience Segments", segments)} />
              </div>
              <div>
                {segments.map((seg) => (
                  <span key={seg} className="pill">{seg}</span>
                ))}
              </div>
            </section>
          )}

          {active === "insights" && (
            <section>
              <div className="section-title">
                <h3>Pain Points</h3>
                <CopyButton text={stringifySection("Pain Points", pains)} />
              </div>
              <div className="row">
                {pains.map((b) => (
                  <div key={b.category} className="card">
                    <h4>{b.category}</h4>
                    <ul className="list">
                      {b.items.map((i, idx) => <li key={idx}>{i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="section-title" style={{ marginTop: 16 }}>
                <h3>Dreams and Desires</h3>
                <CopyButton text={stringifySection("Dreams and Desires", dreams)} />
              </div>
              <div className="row">
                {dreams.map((d) => (
                  <div key={d.theme} className="card">
                    <h4>{d.theme}</h4>
                    <ul className="list">
                      {d.statements.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === "content" && (
            <section>
              <div className="section-title">
                <h3>Content Pillars</h3>
                <CopyButton text={stringifySection("Pillars", pillars)} />
              </div>
              <div className="row">
                {pillars.map((p) => (
                  <div key={p.name} className="card">
                    <h4>{p.name}</h4>
                    <p className="muted">{p.goal}</p>
                  </div>
                ))}
              </div>
              <div className="section-title" style={{ marginTop: 16 }}>
                <h3>Post Ideas</h3>
                <CopyButton text={stringifySection("Ideas", ideas)} />
              </div>
              <div className="row">
                {ideas.map((g) => (
                  <div key={g.pillar} className="card">
                    <h4>{g.pillar}</h4>
                    <ul className="list">
                      {g.ideas.map((i, idx) => <li key={idx}>{i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="section-title" style={{ marginTop: 16 }}>
                <h3>4-Week Calendar</h3>
                <CopyButton text={stringifySection("Calendar (4 weeks)", calendar)} />
              </div>
              <div className="row3">
                {calendar.map((d, idx) => (
                  <div key={idx} className="card">
                    <h4 className="mono">{d.date}</h4>
                    <p><strong>Pillar:</strong> {d.pillar}</p>
                    <p><strong>Format:</strong> {d.format}</p>
                    <p className="muted"><strong>CTA:</strong> {d.CTA}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === "offer" && (
            <section>
              <div className="section-title">
                <h3>Offer Builder</h3>
                <CopyButton text={stringifySection("Offer", offer)} />
              </div>
              <div className="card">
                <h4>Headline</h4>
                <p>{offer.headline}</p>
              </div>
              <div className="row" style={{ marginTop: 12 }}>
                <div className="card">
                  <h4>Value Stack</h4>
                  <ul className="list">{offer.valueStack.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
                </div>
                <div className="card">
                  <h4>Bonuses</h4>
                  <ul className="list">{offer.bonuses.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
                </div>
              </div>
              <div className="row" style={{ marginTop: 12 }}>
                <div className="card">
                  <h4>Guarantees</h4>
                  <ul className="list">{offer.guarantees.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
                </div>
                <div className="card">
                  <h4>Urgency</h4>
                  <ul className="list">{offer.urgency.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

