import {getLayerByName} from './customFunctions.js'

const map=$('#map').data('map');

/**
 * Elements that make up the offcanvas.
 */
const container = document.getElementById('offc-div');
const content = document.getElementById('offcanvas-body');

const pillDct = 
    {'Economy': `econ-class-pill`,
    'Land Use': `land-class-pill`,
    'Environmental Quality':`env-class-pill`,
    'Community and Culture':`comm-class-pill`,
    'Climate Action':`clm-class-pill`,
    'Energy':`enr-class-pill`,
    'Biodiversity':`bio-class-pill`,
    'Research and Applied Sciences':`res-class-pill`
    };

map.on('singleclick', function (evt) {
    const coordinate = evt.coordinate;
  
    const view=map.getView();
    const resolution=view.getResolution();
    const projection=view.getProjection();
  
    // policies
    ////////////////
    const locPolInfo=$('#local-pol');
    locPolInfo.html('');
    const regPolInfo=$('#reg-pol');
    regPolInfo.html('');
    const natPolInfo=$('#nat-pol');
    natPolInfo.html('');
    const euPolInfo=$('#eu-pol');
    euPolInfo.html('');
    const globPolInfo=$('#glob-pol');
    globPolInfo.html('');
    ///////////////
    // default
    const noFeatures=$('#offc-no-features');
    noFeatures.html('<p>No features</p>');
  
    const ipolLayer=getLayerByName('Policies');
    const ipolSource=ipolLayer.getSource();
    const ipolUrl=ipolSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});    
    if(ipolUrl){
        var polList= [];
        // gets features
        $.ajax({
            url:ipolUrl,
            method:'GET',
            async:false,
            success:function(result){
                for (let i=0; i < result.features.length; i++){
                    const ipol=result.features[i];
                    if(ipol){
                        polList.push(
                            {'name':ipol.properties.name, 
                            'level':ipol.properties.level, 
                            'class':ipol.properties.classif, 
                            'link':ipol.properties.link}
                        );
                    }
                }
            }
        })
        // formats features
        // does by level first 
        // [someday we can make this more efficient but for this presentation...]
        for (let i=0; i < polList.length; i++){
            var element = 
                `<p>Name: ${polList[i]['name']}</p>
                <p>Level: ${polList[i]['level']}</p>
                <p style="display: inline">Classification:</p>
                <p style="display: inline" class="badge rounded-pill ${pillDct[polList[i]['class']]}">${polList[i]['class']}</p>
                <br>
                <a href=${polList[i]['link']} target="_blank" rel="noopener noreferrer">Link to Policy</a>
                <br><br>`;
            if(polList[i]['level']=="County"){
                locPolInfo.append(element);
            }else if(polList[i]["level"]=="Regional"){
                regPolInfo.append(element);
            }else if(polList[i]["level"]=="National"){
                natPolInfo.append(element);
            }else if(polList[i]["level"]=="European"){
                euPolInfo.append(element);
            }else if(polList[i]["level"]=="Global"){
                globPolInfo.append(element);
            }
            noFeatures.html('');
        }
    }

});