import React from "react";

export default function PosterForm() {
  return (
    <div className="container mt-5">
      <form>
        <div className="row">
          <div className="col">
            <div class="form-group col-md-4">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Name of Birthday Person"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
