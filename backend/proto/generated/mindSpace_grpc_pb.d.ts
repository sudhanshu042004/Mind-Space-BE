// package: unary
// file: mindSpace.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as mindSpace_pb from "./mindSpace_pb";

interface IUnaryService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getServerResponse: IUnaryService_IGetServerResponse;
    getMoodScore: IUnaryService_IGetMoodScore;
    getFeedBack: IUnaryService_IGetFeedBack;
}

interface IUnaryService_IGetServerResponse extends grpc.MethodDefinition<mindSpace_pb.Request, mindSpace_pb.Response> {
    path: "/unary.Unary/GetServerResponse";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mindSpace_pb.Request>;
    requestDeserialize: grpc.deserialize<mindSpace_pb.Request>;
    responseSerialize: grpc.serialize<mindSpace_pb.Response>;
    responseDeserialize: grpc.deserialize<mindSpace_pb.Response>;
}
interface IUnaryService_IGetMoodScore extends grpc.MethodDefinition<mindSpace_pb.JournalText, mindSpace_pb.MoodScore> {
    path: "/unary.Unary/GetMoodScore";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mindSpace_pb.JournalText>;
    requestDeserialize: grpc.deserialize<mindSpace_pb.JournalText>;
    responseSerialize: grpc.serialize<mindSpace_pb.MoodScore>;
    responseDeserialize: grpc.deserialize<mindSpace_pb.MoodScore>;
}
interface IUnaryService_IGetFeedBack extends grpc.MethodDefinition<mindSpace_pb.JournalText, mindSpace_pb.Feedback> {
    path: "/unary.Unary/GetFeedBack";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mindSpace_pb.JournalText>;
    requestDeserialize: grpc.deserialize<mindSpace_pb.JournalText>;
    responseSerialize: grpc.serialize<mindSpace_pb.Feedback>;
    responseDeserialize: grpc.deserialize<mindSpace_pb.Feedback>;
}

export const UnaryService: IUnaryService;

export interface IUnaryServer {
    getServerResponse: grpc.handleUnaryCall<mindSpace_pb.Request, mindSpace_pb.Response>;
    getMoodScore: grpc.handleUnaryCall<mindSpace_pb.JournalText, mindSpace_pb.MoodScore>;
    getFeedBack: grpc.handleUnaryCall<mindSpace_pb.JournalText, mindSpace_pb.Feedback>;
}

export interface IUnaryClient {
    getServerResponse(request: mindSpace_pb.Request, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Response) => void): grpc.ClientUnaryCall;
    getServerResponse(request: mindSpace_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Response) => void): grpc.ClientUnaryCall;
    getServerResponse(request: mindSpace_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Response) => void): grpc.ClientUnaryCall;
    getMoodScore(request: mindSpace_pb.JournalText, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.MoodScore) => void): grpc.ClientUnaryCall;
    getMoodScore(request: mindSpace_pb.JournalText, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.MoodScore) => void): grpc.ClientUnaryCall;
    getMoodScore(request: mindSpace_pb.JournalText, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.MoodScore) => void): grpc.ClientUnaryCall;
    getFeedBack(request: mindSpace_pb.JournalText, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Feedback) => void): grpc.ClientUnaryCall;
    getFeedBack(request: mindSpace_pb.JournalText, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Feedback) => void): grpc.ClientUnaryCall;
    getFeedBack(request: mindSpace_pb.JournalText, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Feedback) => void): grpc.ClientUnaryCall;
}

export class UnaryClient extends grpc.Client implements IUnaryClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getServerResponse(request: mindSpace_pb.Request, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Response) => void): grpc.ClientUnaryCall;
    public getServerResponse(request: mindSpace_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Response) => void): grpc.ClientUnaryCall;
    public getServerResponse(request: mindSpace_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Response) => void): grpc.ClientUnaryCall;
    public getMoodScore(request: mindSpace_pb.JournalText, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.MoodScore) => void): grpc.ClientUnaryCall;
    public getMoodScore(request: mindSpace_pb.JournalText, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.MoodScore) => void): grpc.ClientUnaryCall;
    public getMoodScore(request: mindSpace_pb.JournalText, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.MoodScore) => void): grpc.ClientUnaryCall;
    public getFeedBack(request: mindSpace_pb.JournalText, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Feedback) => void): grpc.ClientUnaryCall;
    public getFeedBack(request: mindSpace_pb.JournalText, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Feedback) => void): grpc.ClientUnaryCall;
    public getFeedBack(request: mindSpace_pb.JournalText, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mindSpace_pb.Feedback) => void): grpc.ClientUnaryCall;
}
