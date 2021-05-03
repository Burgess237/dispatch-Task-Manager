export class Task {
    id: string;
    taskName: string;
    creationDate: Date; // ISO date
    dueDate: Date; // ISO date
    extraInfo: string; // GPS Location?
    priority: string; // low medium high
    status: string; // active, complete
    collectFrom: string; // From Location
    deliverTo: string; // To Location
}
