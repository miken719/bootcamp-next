import Header from "@/component/Layout/Header";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const exploreBootcampFormik = useFormik({
    initialValues: {
      miles: "",
      zipcode: "",
    },
    onSubmit: (values) => {
      if (values.miles === "" || values.zipcode === "") {
        router.push("/bootcamp");
      } else {
        router.push(`/bootcamp/${values.zipcode}/${values.miles}`);
      }
    },
  });
  return (
    <div>
      {/* Navbar */}
      <Header />
      {/* Showcase */}
      <section className="showcase">
        <div className="dark-overlay">
          <div className="showcase-inner container">
            <h1 className="display-4">Find a Code Bootcamp</h1>
            <p className="lead">
              Find, rate and read reviews on coding bootcamps
            </p>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="miles"
                    placeholder="Miles From"
                    value={exploreBootcampFormik.values.miles}
                    onChange={exploreBootcampFormik.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder="Enter Zipcode"
                    value={exploreBootcampFormik.values.zipcode}
                    onChange={exploreBootcampFormik.handleChange}
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              onClick={() => exploreBootcampFormik.handleSubmit()}
              defaultValue="Find Bootcamps"
              className="btn btn-primary btn-block"
            />
          </div>
        </div>
      </section>
      {/* Latest bootcamps */}
      {/* <section class="latest py-5 bg-light">
			<div class="container">
				<h3>Latest Bootcamps</h3>
				<div class="card-group">
					<div class="card">
						<img src="img/image_1.jpg" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">
								<a href="bootcamp.html"
									>Devworks Bootcamp
									<span class="float-right badge badge-success">8.8</span></a
								>
							</h5>
							<span class="badge badge-dark mb-2">Boston, MA</span>
							<p class="card-text">
								Devworks is a full stack JavaScript Bootcamp located in the
								heart of Boston that focuses on the technologies you need to get
								a high paying job as a web developer
							</p>
							<p class="card-text">
								<small class="text-muted"
									>Web Development, UI/UX, Mobile Development</small
								>
							</p>
						</div>
					</div>
					<div class="card">
						<img src="img/image_2.jpg" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">
								<a href="bootcamp.html"
									>ModernTech Bootcamp
									<span class="float-right badge badge-success">7.5</span></a
								>
							</h5>
							<span class="badge badge-dark mb-2">Boston, MA</span>
							<p class="card-text">
								ModernTech has one goal, and that is to make you a rockstar
								developer and/or designer with a six figure salary. We teach
								both development and UI/UX
							</p>
							<p class="card-text">
								<small class="text-muted"
									>Web Development, UI/UX, Mobile Development</small
								>
							</p>
						</div>
					</div>
					<div class="card">
						<img src="img/image_3.jpg" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">
								<a href="bootcamp.html"
									>Codemasters
									<span class="float-right badge badge-success">9.2</span></a
								>
							</h5>
							<span class="badge badge-dark mb-2">Burlington, VT</span>
							<p class="card-text">
								Is coding your passion? Codemasters will give you the skills and
								the tools to become the best developer possible. We specialize
								in full stack web development and data science
							</p>
							<p class="card-text">
								<small class="text-muted"
									>Web Development, Data Science, Marketing</small
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section> */}
    </div>
  );
}
