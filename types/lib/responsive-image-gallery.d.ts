import {Options} from './options'

interface GalleryElement {
    el: HTMLElement;
    category: string;
    active: boolean;
    left?: number;
    top?: number;
}

export declare class ResponsiveImageGallery {
    el: HTMLElement;
    bar: HTMLElement;
    active: string;
    timing: string;
    duration: number;
    minWidth: number;
    maxWidth: number;
    height: number;
    horizontalSpace: number;
    verticalSpace: number;
    overflow: boolean;
    grid: boolean;
    elements: GalleryElement[];
    count: number;
    width: number;
    processing: boolean;
    processingTimeout: number;  
    completed: number;

    constructor(o?:Options);
    extractAttributes(o?:Options): void;
    setCategory(e:Event): void;
    get(): string;
    set(active:string, animate?:boolean): void;
    getTiming(): string;
    setTiming(timing:string): void;
    getDuration(): number;
    setDuration(duration:number): void;
    destroy(): void;
    resize(): void;
    animate(animation?:boolean): void;
    completeProcess(): void;
}