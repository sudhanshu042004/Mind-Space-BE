// package: unary
// file: mindSpace.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Feedback extends jspb.Message { 
    getText(): string;
    setText(value: string): Feedback;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Feedback.AsObject;
    static toObject(includeInstance: boolean, msg: Feedback): Feedback.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Feedback, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Feedback;
    static deserializeBinaryFromReader(message: Feedback, reader: jspb.BinaryReader): Feedback;
}

export namespace Feedback {
    export type AsObject = {
        text: string,
    }
}

export class JournalText extends jspb.Message { 
    getText(): string;
    setText(value: string): JournalText;
    getUserid(): number;
    setUserid(value: number): JournalText;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): JournalText.AsObject;
    static toObject(includeInstance: boolean, msg: JournalText): JournalText.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: JournalText, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): JournalText;
    static deserializeBinaryFromReader(message: JournalText, reader: jspb.BinaryReader): JournalText;
}

export namespace JournalText {
    export type AsObject = {
        text: string,
        userid: number,
    }
}

export class Request extends jspb.Message { 
    getName(): string;
    setName(value: string): Request;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Request.AsObject;
    static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Request;
    static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
    export type AsObject = {
        name: string,
    }
}

export class Response extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): Response;
    getRecieved(): boolean;
    setRecieved(value: boolean): Response;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        message: string,
        recieved: boolean,
    }
}

export class MoodScore extends jspb.Message { 
    getAnxietylevel(): number;
    setAnxietylevel(value: number): MoodScore;
    getLowmoodlevel(): number;
    setLowmoodlevel(value: number): MoodScore;
    getContentmentlevel(): number;
    setContentmentlevel(value: number): MoodScore;
    getFrustrationlevel(): number;
    setFrustrationlevel(value: number): MoodScore;
    getExcitementlevel(): number;
    setExcitementlevel(value: number): MoodScore;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MoodScore.AsObject;
    static toObject(includeInstance: boolean, msg: MoodScore): MoodScore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MoodScore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MoodScore;
    static deserializeBinaryFromReader(message: MoodScore, reader: jspb.BinaryReader): MoodScore;
}

export namespace MoodScore {
    export type AsObject = {
        anxietylevel: number,
        lowmoodlevel: number,
        contentmentlevel: number,
        frustrationlevel: number,
        excitementlevel: number,
    }
}
