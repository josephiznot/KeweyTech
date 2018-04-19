import React from "react";
import HelpOutline from "material-ui/svg-icons/action/help-outline";
import Security from "material-ui/svg-icons/hardware/security";
import Warning from "material-ui/svg-icons/alert/warning";
import Settings from "material-ui/svg-icons/action/settings";
import NewReleases from "material-ui/svg-icons/av/new-releases";
function Stats() {
  return (
    <div className="stats-container">
      <section className="stat-section">
        <br />
        <Security style={{ width: 60, height: 60 }} />
        <br />
        <h1 className="stat-title">Protecting the next generation</h1>
        <br />
        <p>
          With each generation comes new ideas, and innovations. We are
          responsible for the next generation, and those ideas, in order for
          each of them to fulfill their contribution to society. Each generation
          is going to eventually become dependent on the next as we age.
        </p>
      </section>
      <section className="stat-section">
        <br />
        <Warning style={{ width: 60, height: 60 }} />
        <br />
        <h1 className="stat-title">Your children are at risk</h1>
        <br />
        <p>
          In 80% of abductions by strangers, the first contact between the child
          and the abductor occurs within a quarter mile of the child's home.
          Kidnappings do not discriminate against neighborhoods. Children are
          most vulnerable to abductions due to their trusting nature.
        </p>
      </section>
      <section className="stat-section">
        <br />
        <HelpOutline style={{ width: 60, height: 60 }} />
        <br />
        <h1 className="stat-title">How can we ensure our children's safety?</h1>
        <br />
        <p>
          Education and awareness are key factors in keeping our children's
          safe. In this current era, with everything becoming fast-paced, how
          are we going to constantly ensure our children's safety? Kewey gives
          you peace of mind by constantly keeping you updated on your child's
          current where abouts.
        </p>
      </section>
      <section className="stat-section">
        <br />
        <NewReleases style={{ width: 60, height: 60 }} />
        <br />
        <h1 className="stat-title">Kewey's Latest Technology</h1>
        <br />
        <p>
          The developers at Kewey Technologies have created a way to pinpoint a
          user's current location via cell towers and wife nodes within the
          surrounding area. If the child steps foot outside of the Kewey fence,
          the parent will be notified with their location immediately.
        </p>
      </section>
      <section className="stat-section">
        <br />
        <HelpOutline style={{ width: 60, height: 60 }} />
        <br />
        <h1 className="stat-title">What is a Kewey fence?</h1>
        <br />
        <p>
          A Kewey fence is a a virtual geographic boundary, defined by Kewey's
          GPS technology, that enables Kewey software to trigger a response when
          a mobile device leaves a particular area.
        </p>
      </section>
      <section className="stat-section">
        <br />
        <Settings style={{ width: 60, height: 60 }} />
        <br />
        <h1 className="stat-title">Easy Setup</h1>
        <br />
        <p>
          Once you have established a Kewey fence through the app, you are on
          your way to peace of mind and security. Now any moment your child
          steps outside of the fence, you as the parent will be notified
          immediately by text.
        </p>
      </section>
      <br />
    </div>
  );
}
export default Stats;
