import { AppError } from './app-error';
export class AppErrorHandler implements AppErrorHandler {
    handleError(error) {
        alert('affff');
        console.log(error);
    }
}