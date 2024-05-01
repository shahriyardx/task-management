export type Member = {
  username: string
  email: string
}

export type Task = {
  title: string
  deadline: Date,
  assignedTo: Member
  status: "to-do" | "in-progress" | "done"
}

export type Project = {
  id: string
  title: string
  image: string
  members: Array<Member>,
  tasks: Array<Task>,
}
