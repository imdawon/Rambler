export default function createNotificationEvent(notificationMessage) {
    // Create text for ActionNotication popup
    const bucketListSuccessNotification = new CustomEvent('runNotification', {detail: notificationMessage });
    // Run our newly created event
    window.dispatchEvent(bucketListSuccessNotification);
}
