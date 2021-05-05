export class Task {
    id: string;
    taskName: string;
    description: string;
    creationDate: Date; // ISO date
    dueDate: Date; // ISO date
    priority: string; // low medium high
    status: string; // active, complete
    collectFrom: string; // From Location
    collectLocation: string;
    deliverTo: string; // To Location
    deliverLocation: string;
}
