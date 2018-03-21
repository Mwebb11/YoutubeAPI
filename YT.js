var channelName ='TechGuyWeb'
$(document).ready(function(){
    $.get(
         "https://www.googleapis.com/youtube/v3/channels",{
            part:'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyCct6i19g2bJn3EyPpqfCPZEpXvE99l_qg'},
            function(data){
                $.each(data.items, function(i,item){
                    console.log(item);
                    pid = item.contentDetails.relatedPlaylists.uploads;
                    getVids(pid);
                })
            }
    );
    function getVids(pid){
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems",{
               part:'snippet',
               maxResults: 10,
               playlistId: pid,
               key: 'AIzaSyCct6i19g2bJn3EyPpqfCPZEpXvE99l_qg'},
               function(data){
                   var output;
                   $.each(data.items, function(i,item){
                       console.log(item);
                      videTitle = item.snippet.title;
                      videoId = item.snippet.resourceId.videoId;

                      output = '<li><iframe src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';
                      $('#results').append(output);
                   })
               }
       );
    }
});