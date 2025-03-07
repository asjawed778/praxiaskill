import React from "react";

export default function Overview({ specificCourse }) {
  return (
    <div>
      <h1 className="font-bold">
        Explore Our Immersive{" "}
        {specificCourse?.courseTitle}{" "}
        Bootcamp
      </h1>

      <section className="text-justify">
        <p dangerouslySetInnerHTML={{ __html: specificCourse?.description }} />
      </section>
    </div>
  );
}
