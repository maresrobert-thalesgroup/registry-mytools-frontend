export class BookingRequest {
    request_by_id: number;
    request_for_id: number;
    startDate: Date;
    endDate: Date;
    accessFloors: number[];
    kitNeeded: String;
    status: number;
}