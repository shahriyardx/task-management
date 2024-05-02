export type Member = {
  username: string
}

export type Task = {
  id: string
  title: string
  deadline: Date,
  members: Array<Member>
  status: "to-do" | "in-progress" | "done"
}

type Activity = {
  description: string
  time: Date
}

export type Project = {
  id: string
  title: string
  image: string
  members: Array<Member>,
  tasks: Array<Task>,
  activities: Array<Activity>
}
