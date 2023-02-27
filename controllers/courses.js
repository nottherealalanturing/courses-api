const Joi = require("joi");
const coursesRouter = require("express").Router();

const courses = [
  { id: 1, title: "Mathematics" },
  { id: 2, title: "English" },
  { id: 3, title: "Commerce" },
  { id: 4, title: "Government" },
  { id: 5, title: "Economics" },
];

coursesRouter.get("/", (request, response) => {
  response.json(courses);
});

coursesRouter.get("/:id", (request, response) => {
  const course = courses.find((c) => c.id === parseInt(request.params.id));
  if (course) {
    response.json(course);
  } else {
    response.status(404).send("Course with the given id wasn't found.");
  }
});

coursesRouter.post("/", (request, response) => {
  const { error } = validateCourse(request.body);

  if (error) {
    response.status(400).send(error.details[0].message);
  } else {
    const course = {
      id: courses.length + 1,
      title: request.body.title,
    };

    courses.push(course);

    response.status(201).send(course);
  }
});

coursesRouter.delete("/:id", async (request, response) => {
  const course = courses.find((c) => c.id === parseInt(request.params.id));

  if (!course)
    response.status(404).send("Course with the given id wasn't found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  response.send(course);
});

coursesRouter.put("/:id", (request, response) => {
  const course = courses.find((c) => c.id === parseInt(request.params.id));

  if (!course)
    response.status(404).send("Course with the given id wasn't found.");

  const { error } = validateCourse(request.body);
  if (error) {
    response.status(400).send(result.error.details[0].message);
  } else {
    course.title = request.body.title;
    response.send(course);
  }
});

function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

module.exports = coursesRouter;
