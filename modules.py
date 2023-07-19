from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, FloatField, RadioField
from wtforms.validators import ValidationError, DataRequired, Length, NumberRange, InputRequired
import json


CONFIGFILE = "./uploads/config/config.json"

'''
Class Definitions
'''
# thanks to andy for these two classes
class Dict(dict):
    """dot.notation access to dictionary attributes"""
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__
class Configuration(object):
    @staticmethod
    def __load__(data):
        if type(data) is dict:
            return Configuration.load_dict(data)
        else:
            return data
    @staticmethod
    def load_dict(data: dict):
        result = Dict()
        for key, value in data.items():
            result[key] = Configuration.__load__(value)
        return result
    @staticmethod
    def load_json(path: str):
        with open(path, "r") as f:
            result = Configuration.__load__(json.loads(f.read()))
        return result

class ConfigForm(FlaskForm):
    #<input type="radio" name="flow_method" value="PyrLK">Pyramidal Lucas-Kanade</input>
    #<input type="radio" name="flow_method" value="Fnbk">Farneback</input><br>
    proc_batch = IntegerField(label=('Processing Batch Size:'), validators=[DataRequired(), NumberRange(min=3, max=99999)])
    stream_batch= IntegerField(label=('Streaming Batch Size:'), validators=[DataRequired(), NumberRange(min=3, max=99999)])
    flow_method= RadioField(label=('Optical Flow Method:'), choices=[("PyrLK", "Pyramidal Lucas-Kanade"),("Fnbk","Farneback")], validators=[InputRequired()])
    flow_winsize= IntegerField(label=('Flow Claculation Window Size:'), validators=[DataRequired(), NumberRange(min=1, max=999)])
    sparsematch_quality = FloatField(label=('SparseMatcher Quality Level:'), validators=[DataRequired(), NumberRange(min=0.0000000001, max=0.999)])
    pointsred_maxdist = FloatField(label=('PointsReducer Maximum Distance:'), validators=[DataRequired(), NumberRange(min=0.0000000001, max=0.999)])
    pointsred_winsize = IntegerField(label=('PointsReducer Window Size:'), validators=[DataRequired(), NumberRange(min=1, max=999)])
    submit=SubmitField("Submit")

'''
Function Definitions
'''

def parse_config(CONFIGFILE):
    config_json = Configuration.load_json(CONFIGFILE)
    proc_batch = config_json.modeconf.batchsize
    stream_batch = config_json.modeconf.streaming_batch_size
    flow_method = config_json.flow.method
    flow_winsize = config_json.flow.winsize
    sparsematch_quality = config_json.sparsematcher.quality_level
    pointsred_maxdist = config_json.pointsreducer.max_pt_distance
    pointsred_winsize = config_json.pointsreducer.winsize
    return proc_batch, stream_batch, flow_method, flow_winsize, sparsematch_quality, pointsred_maxdist, pointsred_winsize

def populate_config(proc_batch, stream_batch, flow_method, flow_winsize, sparsematch_quality, pointsred_maxdist, pointsred_winsize):
    with open(CONFIGFILE, "r") as config_json:
        data = json.load(config_json)
    data["modeconf"]["batchsize"] = proc_batch
    data["modeconf"]["streaming_batch_size"] = stream_batch
    data["flow"]["method"] = flow_method
    data["flow"]["winsize"] = flow_winsize
    data["sparsematcher"]["quality_level"] = sparsematch_quality
    data["pointsreducer"]["max_pt_distance"] = pointsred_maxdist
    data["pointsreducer"]["winsize"] = pointsred_winsize
    with open(CONFIGFILE, "w") as config_json:
        json.dump(data, config_json)
