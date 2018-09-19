declare interface liffProfile {
  userId: string
  utouId: string
  displayName: string
  pictureUrl: String
  statusMessage: string
}

declare namespace liff {
  function init (successCallback: any, errorCallback: any): void;
  function sendMessages (o: object): any;
  function getProfile (): any;
}
