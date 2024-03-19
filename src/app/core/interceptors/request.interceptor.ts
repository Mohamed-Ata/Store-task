import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { finalize, Observable } from "rxjs";
import { HelperService } from "../services/helper.service";
// import { HelperServiceService } from "../services/helper-service.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  requestCounter = 0;  

  constructor(private _helperService: HelperService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const lang = localStorage.getItem("lang");


    if (request.url.indexOf("assets") === -1) {
      // to Detect changes After all views init
      setTimeout(() => {
        switch (request.method) {
          case "DELETE":
            this._helperService.loader.next({ show: true, type: "wave" });
            break;
          case "PUT":
            this._helperService.loader.next({ show: true, type: "wave" });
            break;
          case "POST":
            this._helperService.loader.next({ show: true, type: "wave" });
              break;
          case "GET":
            if (!this.isLoadedApiUrl(request.url)) {
              break;
            } else {
              this._helperService.loader.next({ show: true, type: "wave" });
              break;
            }
        }
      }, 0);

      if (request.headers.get("langType")) {
        request = request.clone({
          setHeaders: {
            "Accept-Language": `${request.headers.get("langType")}`,
          },
        });
      } else {
        request = request.clone({
          setHeaders: {
            "Accept-Language": `${lang}`,
          },
        });
      }
    }

    if (
      request.url.indexOf("ar.json") > -1 ||
      request.url.indexOf("en.josn") > -1
    ) {
      return next.handle(request);
    } else {
      this.requestCounter++;
      if (this.requestCounter > 0) {
        setTimeout(() => {
          switch (request.method) {
            case "DELETE":
              this._helperService.loader.next({ show: true, type: "wave" });
              break;
            case "PUT":
              this._helperService.loader.next({ show: true, type: "wave" });
              break;

            case "POST":
              this._helperService.loader.next({ show: true, type: "wave" });
                break;
            case "GET":
              if (!this.isLoadedApiUrl(request.url)) {
                break;
              } else {
                this._helperService.loader.next({ show: true, type: "wave" });
                break;
              }
          }
        }, 100);
      }
      return next.handle(request).pipe(
        finalize(() => {
          this.requestCounter--;
          if (this.requestCounter === 0) {
            setTimeout(() => {
              this._helperService.loader.next(null);
            }, 100);
          }
        })
      );
    }
  }

  isLoadedApiUrl(url: string) {
    let isLoaded = true;
    // this.stopLoaderApiUrls["GET"].forEach((stopUrl) => {
    //   isLoaded = !url.includes(stopUrl);
    // });
    return isLoaded;
  }
}
