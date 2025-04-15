// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mindSpace_pb = require('./mindSpace_pb.js');

function serialize_unary_Feedback(arg) {
  if (!(arg instanceof mindSpace_pb.Feedback)) {
    throw new Error('Expected argument of type unary.Feedback');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_unary_Feedback(buffer_arg) {
  return mindSpace_pb.Feedback.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_unary_JournalText(arg) {
  if (!(arg instanceof mindSpace_pb.JournalText)) {
    throw new Error('Expected argument of type unary.JournalText');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_unary_JournalText(buffer_arg) {
  return mindSpace_pb.JournalText.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_unary_MoodScore(arg) {
  if (!(arg instanceof mindSpace_pb.MoodScore)) {
    throw new Error('Expected argument of type unary.MoodScore');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_unary_MoodScore(buffer_arg) {
  return mindSpace_pb.MoodScore.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_unary_Request(arg) {
  if (!(arg instanceof mindSpace_pb.Request)) {
    throw new Error('Expected argument of type unary.Request');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_unary_Request(buffer_arg) {
  return mindSpace_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_unary_Response(arg) {
  if (!(arg instanceof mindSpace_pb.Response)) {
    throw new Error('Expected argument of type unary.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_unary_Response(buffer_arg) {
  return mindSpace_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var UnaryService = exports.UnaryService = {
  getServerResponse: {
    path: '/unary.Unary/GetServerResponse',
    requestStream: false,
    responseStream: false,
    requestType: mindSpace_pb.Request,
    responseType: mindSpace_pb.Response,
    requestSerialize: serialize_unary_Request,
    requestDeserialize: deserialize_unary_Request,
    responseSerialize: serialize_unary_Response,
    responseDeserialize: deserialize_unary_Response,
  },
  getMoodScore: {
    path: '/unary.Unary/GetMoodScore',
    requestStream: false,
    responseStream: false,
    requestType: mindSpace_pb.JournalText,
    responseType: mindSpace_pb.MoodScore,
    requestSerialize: serialize_unary_JournalText,
    requestDeserialize: deserialize_unary_JournalText,
    responseSerialize: serialize_unary_MoodScore,
    responseDeserialize: deserialize_unary_MoodScore,
  },
  getFeedBack: {
    path: '/unary.Unary/GetFeedBack',
    requestStream: false,
    responseStream: false,
    requestType: mindSpace_pb.JournalText,
    responseType: mindSpace_pb.Feedback,
    requestSerialize: serialize_unary_JournalText,
    requestDeserialize: deserialize_unary_JournalText,
    responseSerialize: serialize_unary_Feedback,
    responseDeserialize: deserialize_unary_Feedback,
  },
};

exports.UnaryClient = grpc.makeGenericClientConstructor(UnaryService, 'Unary');
